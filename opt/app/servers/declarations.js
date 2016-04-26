	module.exports = function() { 
	    this.ConversationBO = function(participant1,participant2,chatCounter){
		this.participant1 = participant1;
		this.participant2 = participant2;
		this.chatId = chatCounter;
		this.conversationID = "chat"+this.chatId;
		this.roomID = "chat"+this.chatId;
		this.messages = [];
		this.getConversationID = function() {return this.conversationID;}	
		};
		this.ConversationBO.prototype.addMessage = function(msgObject) {
		this.messages.unshift(msgObject);
		};
		this.MessageBO = function(sender,recepient,msgText)
		{
		this.sender = sender;
		this.recepient = recepient;
		this.msgText = msgText; 
		};
		this.MessageBO.prototype.parseMessage = function(msgToBeParsed){
		var tempObject = JSON.parse(msgToBeParsed);
		this.sender = tempObject["sender"];
		this.recepient = tempObject["recepient"];
		this.msgText = tempObject["message"];
		};
		this.MessageBO.prototype.getMessageBO = function(){
		var tempObject = {sender: this.sender, 
						recepient: this.recepient, 
						msgText: this.msgText};
		return JSON.stringify(tempObject);
		};
		this.ConversationSet = function(){
		this.conversations = [];
		};
		this.ConversationSet.prototype.addConversation = function(conversationBO){
		this.conversations.push(conversationBO);
		};

		this.ConversationSet.prototype.getConversationBO = function(user1,user2){
		var convObj;
		for(var i=0;i<this.conversations.length;i++)
		{
			convObj = this.conversations[i];
			if(convObj["participant1"]===user1 || convObj["participant2"] ===user1)
			{	
				if(convObj["participant1"]===user2 || convObj["participant2"] ===user2)
				{
					return convObj;
				}
			 }
			}
		};

		this.ConversationSet.prototype.getNameSpaceConv = function(user1,user2){
	  	 var conversationBO = this.getConversationBO(user1,user2);
	   		if(typeof conversationBO != 'undefined')
	   		{
	   		return conversationBO["conversationID"];
	   		}
	  	};

	}


