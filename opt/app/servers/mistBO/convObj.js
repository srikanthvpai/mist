var Conversation = function(participantA,participantB,id,convService) {

	this.MsgObj = require('./msgObj.js');
	this.participantA = participantA;
	this.participantB = participantB;
	this.convService = convService;
	this.id = id;
	this.messageList = [];
};

Conversation.prototype.initialize = function(callback,callbackerr){

	var query1 = "insert into mist01.mistpersonalchatroom(participantA,participantB) values('";
		query1 += this.participantA.firebaseId+"','"+this.participantB.firebaseId+"')";
	var query2 = "select mistid_personalchatroom from mist01.mistpersonalchatroom where participantA='";
		query2 += this.participantA.firebaseId+"' and participantB='";
		query2 += this.participantB.firebaseId+"'";
	var that = this;
	var p = new Promise(function(resolve,reject){
	that.convService.executeQueryFetch(query1,callback,callbackerr);
	});
	p.then(function()
	{
		that.convService.executeQueryFetch(query2,callback,callbackerr);
	}).then(function(resultSet){
		if(resultSet[0] && resultSet[0].mistid_personalchatroom)
		{
			this.id = resultSet[0].mistid_personalchatroom;
			return this.id;
		}
	}).catch(function(err){
		console.log("111 ERROR ERROR 1111 TRYING TO CREATE A PERSONAL CHAT ROOM");
	}).catch(function(err){
		console.log("111 ERROR ERROR 1111 TRYING TO CREATE A PERSONAL CHAT ROOM");
	});
};

Conversation.prototype.addMsgObj = function(msgObject,callback,callbackerr) {
		this.messageList.push(msgObject);
		this.convService.saveMessage(msgObject,this.id,callback,callbackerr);
};
Conversation.prototype.getMsgList = function() {
		return this.messageList;
};
Conversation.prototype.equals = function(player1,player2){
			var check = false;
			var participantAId = this.participantA.firebaseId;
			var participantBId = this.participantB.firebaseId;
			player1 === participantAId ?(player2===participantBId ? check=true : check= false) 
			: (player2 === participantAId ? (player1 === participantBId ? check= true: check=false) 
				: check = false);
		return check;	
};
module.exports = Conversation;

