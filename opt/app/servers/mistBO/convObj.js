var Conversation = function(participantA,participantB,id,convService) {

	this.MsgObj = require('./msgObj.js');
	this.participantA = participantA;
	this.participantB = participantB;
	this.convService = convService;
	this.id = id;
	this.messageList = [];
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

