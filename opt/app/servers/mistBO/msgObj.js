var Message = function(sender,recepient,msgText){

	this.sender = sender;
	this.recepient = recepient;
	this.msgText = msgText;
}


Message.prototype.getMsgObject= function() {
	return {sender: this.sender,recepient: this.recepient, msgText: this.msgText};
}

module.exports = Message;