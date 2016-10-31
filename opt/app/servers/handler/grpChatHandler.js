var GroupChatHandler = function(io){
	var roomList = [];
	var DBService = require('../service/dbService.js');
	this.io = io;
	this.nameSpaces = ["/groupRoom"];
	this.defaultNsp = this.io.of(this.nameSpaces[0]);	
	this.dbService = new DBService();
	var that = this;
	this.defaultNsp.on("connection",function(socket){
	
	console.log("SOMEONE TRIED TO CONNECT TO GROUP CHAT NOW : ");
	socket.join(1);
	socket.on("initialize",function(roomUserData){ that.initialize(roomUserData,socket);});

	socket.on("message",function(roomMsgObj){ that.sendMessage(roomMsgObj,socket); });
});
	
};

GroupChatHandler.prototype.initialize = function(roomUserData,socket){
	console.log("initialize : "+roomUserData);
	var roomUser = JSON.parse(roomUserData);
	socket.join(roomUser.roomId);
	//socket.room = roomUser.roomId;
};

GroupChatHandler.prototype.fillGroupList = function(userObj){
	var query = "select a.mistid_groupchatroom roomId,a.room_name roomName,a.room_description roomDesc from mist01.mistgroupchatroom ";
	query += "as a inner join mist01.mistgrpsubscription as b ON a.mistid_groupchatroom=b.roomId ";
	query += "where b.firebase_id='"+userObj.firebaseId+"'";
	return this.dbService.executeQueryFetch(query);

};

GroupChatHandler.prototype.sendMessage = function(roomMsgObj,socket)
{
	var roomMsg = JSON.parse(roomMsgObj);
	var that = this;
	var query = "insert into mist01.mistgroupmsg(mistid_groupchatroom,msgtext,author) values('";
		query += roomMsg.roomId+"','"+roomMsg.msgText+"','"+roomMsg.author.firebaseId+"')";
	this.dbService.executeQuery(query).then(function() {	
	   that.defaultNsp.in(roomMsg.roomId).emit("message",roomMsgObj);
	}).catch(function(err){
		console.log("ERROR"+err);
	});
};

GroupChatHandler.prototype.subscribeToGroup = function(userObj,roomId){
	var query = "insert into mist01.mistgrpsubscription(roomId,firebase_id) values(";
		query += roomId+",'"+userObj.firebaseId+"')";
	this.dbService.executeQuery(query).then(function(){
		return Promise.resolve(roomId);
	}).catch(function(err){
		console.log("ERROR : "+err);
	});
};

GroupChatHandler.prototype.getGroupMessages = function(req,res) {
	var roomId = JSON.parse(req.query.roomId);
	console.log("REQUESTED ROOM ID : "+roomId);
	var query = "select * from mist01.mistgroupmsg where mistid_groupchatroom = '";
	query+= roomId;
	query+="' order by enter_date desc limit 10";
	this.dbService.executeQueryFetch(query).then(function(resultSet){
		res.json(resultSet);
	}).catch(function(err){
		res.end();
	});
};

GroupChatHandler.prototype.fillGroupUsers = function(req,res){
	var roomId = req.query.roomId;
	var userObj = JSON.parse(req.query.userData);
	var query = "select first_name,last_name,birth_date,join_date,email_id,a.firebase_id from mist01.mistuser as a inner join mist01.mistgrpsubscription as b ON a.firebase_id=b.firebase_id";
	query+= " where a.firebase_id<>'"+userObj.firebaseId+"'";
	query+= " and b.roomId='"+roomId+"'";
	this.dbService.executeQuery(query).then(function(resultSet){
		var grpUserData = [];
		resultSet.forEach(function(userRow){
			var userObj = {};
			userObj.firstName = userRow.first_name;
			userObj.lastName = userRow.last_name;
			userObj.email = userRow.email_id;
			userObj.firebaseId = userRow.firebase_id;
			grpUserData.push(userObj);
		});
		res.json(grpUserData);
	}).catch(function(err){
		console.log("ERROR IN CHAT HANDLER : "+err);
		res.end();
	});
};

module.exports = GroupChatHandler;