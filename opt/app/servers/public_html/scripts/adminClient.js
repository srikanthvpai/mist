var adminMode = true;
$(function(){
	console.log('I AM HERE !!!!!');
	//initiate_chat('administrator', 'Administrator');
	socket = io(CURRENT_URL+"/defaultChat");	
		socket.on("disconnect", function() {

		});
		socket.on("connect", function(){
			var transmitObject = {message: "Administrator", sender: 'administrator',recepient: 'administrator'};
			console.log('Emitting admit connect');
			socket.emit("adminConnect",JSON.stringify(transmitObject));
		});
		socket.on("initClients", function(userData){
			var transmitObject = JSON.parse(userData);
			initiate_chat(transmitObject["recepient"],transmitObject["recepient"]);
		});

		socket.on("message", function(message){
			var transmitObject = JSON.parse(message);
		 	messageToAdmin(transmitObject["msgText"],transmitObject["sender"],transmitObject["recepient"]);
		});
});