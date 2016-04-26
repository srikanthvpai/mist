var chatBoxHandler;
var geometricSpecification;
$(function(){
	chatBoxHandler = new ChatBoxHandler;
	geometricSpecification = new GeometricSpecification;
});

function initiate_chat(participantA,participantB)
{
	chatBoxHandler.initiate_chat(participantA,participantB);
} 

function sendMessage(id)
{
	chatBoxHandler.sendMessage(id);
}

function messageToAdmin(inputMsg,sender,recepient)
{
	var chatBox = chatBoxHandler.getChatBox(sender);
	chatBox.transmitMessageToCanvas(inputMsg,sender,recepient);
}

function close_chatBox(id)
{
	chatBoxHandler.close_chatBox(id);
}

function close_allchatBoxes()
{
	chatBoxHandler.close_allchatBoxes();
}