var ConvService = function(dbService){
	this.dbService = dbService; 
}

ConvService.prototype.saveMessage = function(msgObj,convId){
	console.log("Adding msg to db"+msgObj.msgText);
	var query = "insert into mist01.mistconvmsg(sender,recepient,convid,msgtext) values(";
/*	query+=msgObj.sender+",";
	query+=msgObj.recepient+",";*/
	query+="'"+msgObj.sender.firebaseId+"',";
	query+="'"+msgObj.recepient.firebaseId+"',";
	query+=convId+',"';
	query+=msgObj.msgText;
	query+='")';
	return this.dbService.executeQueryFetch(query);
};

ConvService.prototype.executeQueryFetch = function(query){
	return this.dbService.executeQueryFetch(query);	
};

module.exports = ConvService;