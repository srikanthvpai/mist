var ObjectService = function() {

	var DBHandler = require('../handler/dbHandler.js');
	var dbHandler = new DBHandler();
}

ObjectService.prototype.createObject = function(objectName,colDescription) {

	var query = "CREATE TABLE `sys`.`"+objectName+"` (`mistid_";
	query+= objectName+"` INT NOT NULL AUTO_INCREMENT,";
	for(var i=0;i<colDescription.length;i++)
  	{
  		query+="`"+colDescription[i].colName+"` ";
  		query+=colDescription[i].dataType+" ";
  		query+=colDescription[i].nullAllowed+",";
  	}
  	query+="PRIMARY KEY (`mistid_"+objectName+"`)),";
	console.log("Query for create : "+query);
	dbHandler.executeQuery(executeQuery);
	
}