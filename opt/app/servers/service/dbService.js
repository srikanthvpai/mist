var DBService = function() {
	var config = require('../config.js');
	this.mySql = require('mysql');
	this.Promise = require('bluebird');
	this.Promise.promisifyAll(this.mySql);
	this.pool = this.mySql.createPool({connectionLimit: 1,
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

DBService.prototype.executeQuery = function(query,callback,callbackerr){
	console.log("Query to DB : "+query);
		var that = this;
		this.pool.getConnectionAsync().then(function(connection){
			that.Promise.promisifyAll(connection);
			console.log("Going to execute Qquery !!!!");
			connection.queryAsync(query).then(function(resultSet){
				connection.release();
				for(var property in resultSet)
				{
					console.log(property+ " : "+resultSet[""+property]);
					for(var property in resultSet[0])
					{
						console.log(property+" 0 0 0 0 "+resultSet[0][""+property]);
					}
				}

				/*if(resultSet[0])
					console.log(resultSet[0].mistid_groupchatroom);
				if(callback)*/
					callback(resultSet);
				//return resultSet;
			}).catch(function(err){
				console.log("DB ERROR : "+err);
				connection.release();
				callbackerr(err);
			});
		}).catch(function(err){
			console.log("DB ERROR : "+err);
			connection.release();
			callbackerr(err);
		});
		
	} ;
DBService.prototype.executeQueryFetch  = function(query,callback,callbackerr){
		this.executeQuery(query,callback,callbackerr);
};



module.exports= DBService;




