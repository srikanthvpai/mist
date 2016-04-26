var DBHandler = function(mySql) {
	this.mySql = mySql;
	this.pool = mySql.createPool({connectionLimit: 2,
		host: 'localhost',
		user: 'root',
		password: 'rahman',
		database: 'MySQL',
		debug: false});
}

DBHandler.prototype.executeQuery = function(query){
	console.log("Passing thru this 222222 !!!");
	this.pool.getConnection(function(err,connection){
			if(err)
			{
				console.log("ERROR OBTAINING CONNECTION"+err);
			}
			console.log('connected as id'+connection.threadId);
			connection.query(query,function(err,rows){
				connection.release();
				if(!err){
					console.log("ROWS : "+rows[0]);
					for(var property in rows[0]){
						console.log(property+"********"+rows[0][""+property]);
					}
				}
			});
		});
 } ;



module.exports= function(mySql) { 

	var dbHandler = new DBHandler(mySql);

return { 
	executeQuery : function(query){ dbHandler.executeQuery(query);}	
	}


}




