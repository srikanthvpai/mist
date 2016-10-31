"use strict";
var url = require("url");
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var cookieParser = require('cookie-parser');
var Promise = require('bluebird');
var fs = require("fs");
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//app.use(session({secret: 'Z4f5Gdlo985fg9okSRYTH3ef@^5',resave: false,saveUninitialized: true}));

var server = app.listen(8080,function(){
	console.log("*****SRIKANTH SRIKANTH***** listening on 8080");
});

var ChatHandler = require('./handler/chatHandler.js');
var chatHandler = new ChatHandler(server);

var UserHandler = require('./handler/userHandler.js');
var userHandler = new UserHandler();

var RequestHandler = require('./handler/requestHandler.js');
var reqHandler = new RequestHandler();


app.get('/index.html', function(req,res){
	console.log('REQUESTED INDEX');
	res.redirect('/mainPage.html');
});

app.get('/public_html', function(req,res){
	var value = req.query.value;
	console.log("reqd for : "+value);
});

app.get('/chatList', function(req,res){
	console.log("Server : Trying to fullfill list");
	reqHandler.validateRequest(req,res).then(function(resolve,reject){
		console.log("Sending to chathandler !!!!");
		chatHandler.fillChatList(req,res);
	}).catch(function(err){
		console.log("ERROR ERROR Sending to chathandler !!!!"+err);
	});
});

app.get('/groupList', function(req,res){
	
	reqHandler.validateRequest(req).then(function(){
		return chatHandler.fillGroupList(req);
	}).then(function(resultSet){
		console.log("Result Set in Fill Group List : "+resultSet);
		res.json(resultSet);
	}).catch(function(err){
		res.end();
	});
});

app.get('/groupMessages', function(req,res){
	reqHandler.validateRequest(req).then(function(){
		chatHandler.getGroupMessages(req,res);
	}).catch(function(err){
		console.log("ERROR : "+err);
		res.end();
	});
});

app.get('/groupUserList', function(req,res){
	reqHandler.validateRequest(req).then(function(){
		return chatHandler.fillGroupUsers(req,res);
	}).catch(function(err){
		console.log("ERROR : "+err);
		res.end();
	});
});

app.get('/myFriends', function(req,res){
	console.log("Server: Trying to fill friends list");
	reqHandler.validateRequest(req,res).then(function(){
			userHandler.fillFriends(req,res);
	}).catch(function(err){

	});
});


app.post('/public_html', function(req,res){
	res.sendFile("/public_html/"+req.body.value,{root:__dirname});
});

app.post('/createGroupRoom',function(req,res){
	var roomData  = JSON.parse(req.query.room);
	var userObj = JSON.parse(req.query.userData);
	chatHandler.createGroupRoom(roomData.roomName,roomData.roomDesc).then(function(mistid_groupchatroom){
			console.log("ROOM CREATED ID  : "+mistid_groupchatroom);
			return chatHandler.subscribeToGroup(userObj,mistid_groupchatroom);
	}).then(function(mistid_groupchatroom){
		res.json(mistid_groupchatroom);
	}).catch(function(err){
		res.end();
		console.log("ERROR TRYING TO CREATE GROUP CHAT ROOM"+err);
	});
	
});

app.post('/subscribeToGrp',function(req,res){
	chatHandler.subscribeToGrp(req,res).then(function(){

	}).catch(function(err){

	});
});

app.post('/signUpUser',function(req,res){
	console.log("SIGN UP USER : "+req.query.signUpUser);
	userHandler.addUser(req.query.signUpUser).then(function(){
		res.end();
	}).catch(function(err){});
});

function check(obj){
	for(var property in obj)
	{
		console.log(property+": "+obj[""+property]);
	}
}

app.post('/authSuccess',function(req,res){
	reqHandler.authorizeUser(req,res);
});

app.get('/data',function(req,res){
	reqHandler.validateRequest(req,res).then(function(){
	console.log("Trying to send data");
	var fileName = req.query.fileName;
	var data = require("./data/"+fileName);
	res.writeHead(200,{"Content-Type" : "text/json"});
	res.end(JSON.stringify(data));
	}).catch(function(){

	});
});

var positionIndex=1;
app.get('/positionIndex',function(req,res){
	positionIndex = positionIndex>0 ? -1: 1;
	res.end(JSON.stringify({positionIndex: positionIndex}));
});

app.use(express.static("./public_html",{index: 'mainPage.html'}));