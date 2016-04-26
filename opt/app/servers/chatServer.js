var nameSpaces = ["/defaultChat"];
var rooms = [];
var connectedUsers = [];
var conversations = new ConversationSet();
var adminSocket;
var defaultNsp = io.of(nameSpaces[0]);
var nameSpaces = {};
var isAdminConnected = false;

defaultNsp.on("connection",function(socket){

	socket.on("initialize",function(userDataString){ initialize(userDataString,socket)});
	socket.on("adminConnect",function(messageString){adminConnect(messageString,socket)});
	socket.on("message",function(messageString){sendMessage(messageString,socket)});
});

function initializeRoom(roomID,userData)
{
	rooms.unshift(roomID);
	/*nameSpaces.nameSpace = io.of("/"+nameSpace);
	nameSpaces.nameSpace.on("connection", function(socket){
	socket.on("message",function(messageString){sendMessage(messageString,socket);});
	var welcomeMsgBO = new MessageBO("administrator",userData["sender"],"Welcome to MI-ST chat");
	socket.emit("message",welcomeMsgBO.getMessageBO());
	});*/
}

function initialize(userDataString,socket)
{
	var userData = JSON.parse(userDataString);
	socket["sender"] = userData["sender"];
	socket["recepient"] = userData["recepient"];
	chatCounter++;
	var convObj = new ConversationBO(userData["sender"],userData["recepient"],chatCounter);
	conversations.addConversation(convObj);
	connectedUsers.push(userData["sender"]);
	initializeRoom(convObj["roomID"],userData);
	console.log("TRYING TO JOIN A ROOM : "+convObj["roomID"]);
	socket.join(convObj["roomID"]);
	socket["room"] = convObj["roomID"];
	//socket.emit("chatId",JSON.stringify({conversationID : convObj["conversationID"]}));
}

function sendMessage(messageString,socket)
{
		console.log("Received message , Sending it back "+messageString);
		defaultNsp.in(socket["room"]).emit("message",messageString);
}

function adminConnect(messageString,socket)
{
	console.log("Admin connecting !!!");
	isAdminConnected = true;
	adminSocket = socket;
	var newConnTransmitObject;
	var socketConnected;
	conversations["conversations"].forEach(function(convObj){
		console.log("Admin joining a room"+convObj["roomID"]);
		adminSocket.join(convObj["roomID"]);
		var clients = defaultNsp.in(convObj["roomID"]).clients(function(error,clients){return clients;});
		for(var property in clients)
		{
			console.log(property+" : "+clients.property);
		}
		var newObj = {sender:convObj["participant1"],recepient:convObj["participant1"]};
		adminSocket.emit("initClients", JSON.stringify(newObj));
	});
	//initialize(messageString,socket);
	/*for(var property in defaultNsp.connected)
	{
		var connectedSocket = defaultNsp.connected[property];
		var newConnTransmitObject = {message:"Hi, This is Srikanth here, How are you doing?" , sender: "administrator",recepient: connectedSocket[""]};
		var user = connectedSocket["sender"];
		console.log(property+":"+user);
		if(user!= 'administrator')
		{
			connectedSocket.emit("message",JSON.stringify(newConnTransmitObject));
		}
	}*/
}


function adminNotConnected(socket)
{
	var newConnTransmitObject = {message:"Hi, Sorry, I am not available right now, I will reach out to you as soon as I am back" , sender: "administrator",recepient: socket["sender"]};
	socket.emit("message",JSON.stringify(newConnTransmitObject));
}


