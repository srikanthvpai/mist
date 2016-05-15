var DBService = function() {
	var config = require('../config.js');
	this.mySql = require('mysql');
	this.Promise = require('bluebird');
	this.Promise.promisifyAll(this.mySql);
	this.pool = this.mySql.createPool({connectionLimit: 10,
		host: config.get('MYSQL_HOST'),
		user: config.get('MYSQL_USER'),
		password: config.get('MYSQL_PASSWORD'),
		database: 'mist01',
		debug: false});
	this.Promise.promisifyAll(this.pool);
};

DBService.prototype.getConnection = function(){
	return this.pool.getConnection;
};

DBService.prototype.executeQuery = function(query){
		var that=this,connection;
		console.log("Query : "+query);
		return this.pool.getConnectionAsync().then(function(_connection){
			connection = that.Promise.promisifyAll(_connection);
			return connection.queryAsync(query);
		}).then(function(resultSet){
			connection.release();
			return resultSet;
		}).catch(function(err){
			if(connection)
				connection.release();
			throw err;
		});
	} ;
DBService.prototype.executeQueryFetch  = function(query){
		return this.executeQuery(query);
};



module.exports= DBService;




