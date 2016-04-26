module.exports= function ChatHandler() {

	var ConvHandler = require('./handlers/convHandler.js');
	var convHandler = new ConvHandler();

	return {
		processMessage: function(msgToBeParsed){
		var msgObject = JSON.parse(msgToBeParsed);
		convHandler.addMsg(msgObject);
		console.log("INSIDE CHANT HANDLER");
		},
		addConv: function(participant1,participant2){
		convHandler.addConv(participant1,participant2);	
		}
	}

}	