var ChatHandler = function(server) {

	this.io = require("socket.io")(server);
	this.convHandler = require('../handler/convHandler.js')();
	var GroupChatHandler = require('../handler/grpChatHandler.js');
	var DBService = require('../service/dbService.js');
	this.dbService = new DBService();
	this.grpChatHandler = new GroupChatHandler(this.io);
	this.nameSpaces = ["/defaultChat"];
	this.rooms = [];
	this.adminSocket = null;
	this.defaultNsp = this.io.of(this.nameSpaces[0]);
	this.isAdminConnected = false;
	this.socketList = {};
	var that = this;
	// this.io.sockets.on('connection', function (socket) {
 //    console.log("222222 SOMEONE TRIED TO CONNECT NOW : 2222222 ");
	// }); 
	this.defaultNsp.on("connection",function(socket){
	//console.log("SOMEONE TRIED TO CONNECT NOW : ");
	socket.on("initialize",function(userDataString){ that.initialize(userDataString,socket);});

	socket.on("message",function(msgStringObj){ that.sendMessage(msgStringObj,socket); });
});

}


ChatHandler.prototype.initialize = function(userDataString,socket) {

	var userData = JSON.parse(userDataString);
	socket["sender"] = userData["sender"];
	socket["recepient"] = userData["recepient"];
	var convId = this.addConv(socket.sender,socket.recepient);
	var roomId = convId;
	console.log("RETURNED CONV ID IS : "+convId);
	this.initializeRoom(roomId,userData);
	console.log("TRYING TO JOIN A ROOM : "+roomId);
	socket.join(roomId);
	socket.room = roomId;
};

ChatHandler.prototype.initializeRoom = function(roomID,userData)
{
	this.rooms.unshift(roomID);
}

ChatHandler.prototype.createGroupRoom = function(roomName,roomDescription)
{
	var query1 = "insert into mist01.mistgroupchatroom(room_name,room_description) values('";
		query1 += roomName+"','"+roomDescription+"')";
	var query2 = "select mistid_groupchatroom from mist01.mistgroupchatroom where room_name='";
		query2 += roomName+"'";
		console.log(query1);
	var that = this;	
	return this.dbService.executeQuery(query1).then(function(){
		return that.dbService.executeQueryFetch(query2);
	}).then(function(resultSet){
		if(resultSet && resultSet[0] && resultSet[0].mistid_groupchatroom){
			return resultSet[0].mistid_groupchatroom;
		}
	}).catch(function(err){

	});
};	

ChatHandler.prototype.subscribeToGroup = function(userObj,roomId,roomObj) {
		return this.grpChatHandler.subscribeToGroup(userObj,roomId);
};

ChatHandler.prototype.sendGroupMessage = function(grpMsgObj){
	this.grpChatHandler.sendGroupMessage(grpMsgObj);
};

ChatHandler.prototype.sendMessage = function(msgStringObj,socket)
{
		console.log("Received message , Sending it back "+msgStringObj);
		var curTime = this.getCurrentTime();
		var that = this;
		var convId = -1;
		var p = new Promise(function(resolve,reject) {
			convId = that.processMessage(msgStringObj,resolve,reject);
		});
		//that.defaultNsp.in(convId).emit("message",msgStringObj);
		p.then(function(resultSet){
				console.log("SENDING MESSAGE !!!"+msgStringObj);
				//that.defaultNsp.in(convId).emit("message",msgStringObj);
		}).catch(function(err){
			console.log("INSIDE CHAT HANDLER"+err);
		});

		//fs.readFile("./chatData/"+socket["sender"]+"_"+socket["recepient"]+".json",'utf8',function(readErr,data){
		// console.log("Error during reading is "+readErr);
		// var existingMsgs = JSON.parse(data);
		// existingMsgs.push(msgDBObject);
		//console.log("Current message Length : "+curLen);
		// fs.writeFile("./chatData/"+socket["sender"]+"_"+socket["recepient"]+".json",JSON.stringify(existingMsgs),function(writeErr) {
		// 	console.log("Wrote the messages with error : "+writeErr);
		// });
	    /*});*/
		
};

ChatHandler.prototype.processMessage = function(msgToBeParsed,callback,callbackerr){
	
	var msgObject = JSON.parse(msgToBeParsed);
	return this.convHandler.addMsg(msgObject,callback,callbackerr);

};

ChatHandler.prototype.addConv = function(participant1,participant2){

	return this.convHandler.addConv(participant1,participant2);	
};

ChatHandler.prototype.fillChatList = function(req,res)
{
	var currentUserObj = JSON.parse(req.query.userData);
	var query = "select first_name,last_name,birth_date,join_date,email_id,firebase_id from mist01.mistuser ";
	query+= "where binary firebase_id<>'"+currentUserObj.firebaseId+"'";
	console.log(query);
	this.dbService.executeQuery(query).then(function(resultSet){
		var friendData = [];
		resultSet.forEach(function(userRow){
			var userObj = {};
			userObj.firstName = userRow.first_name;
			userObj.lastName = userRow.last_name;
			userObj.email = userRow.email_id;
			userObj.firebaseId = userRow.firebase_id;
			friendData.push(userObj);
		});
		res.json(friendData);
	}).catch(function(err){
		console.log("ERROR IN CHAT HANDLER : "+err);
		res.end();
	});
};
ChatHandler.prototype.fillGroupList = function(req){
	var userObj = JSON.parse(req.query.userData); 
	return this.grpChatHandler.fillGroupList(userObj);
};

ChatHandler.prototype.fillGroupUsers = function(req,res){
	return this.grpChatHandler.fillGroupUsers(req,res);
};

ChatHandler.prototype.getGroupMessages = function(req,res) {
	this.grpChatHandler.getGroupMessages(req,res);
};


function check(obj){
	for(var property in obj)
	{
		console.log(property+": "+obj[""+property]);
	}
}
ChatHandler.prototype.getCurrentTime = function() {
	var date = new Date();
	
	var hour = date.getHours();
	hour = (hour<10 ? "0":"")+hour;

	var min = date.getMinutes();
	min = (min<10 ? "0":"")+ min;

	var sec = date.getSeconds();
	sec = (sec<10? "0":"")+ sec;

	var year = date.getFullYear();

	var month = date.getMonth()+1;
	month = (month<10 ? "0":"")+ month;

	var day = date.getDate();
	day = (day < 10 ? "0": "")+ day;

	return month+"-"+day+"-"+year+" "+hour+":"+min+":"+sec;

};

module.exports = ChatHandler;