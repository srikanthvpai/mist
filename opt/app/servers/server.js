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
app.use(session({secret: 'Z4f5Gdlo985fg9okSRYTH3ef@^5',resave: false,saveUninitialized: true}));

var server = app.listen(80,function(){
	console.log("*****SRIKANTH SRIKANTH***** listening on 80");
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
	var p = new Promise(function(resolve,reject){	
	reqHandler.validateRequest(req,res,resolve,reject);
	});
	p.then(function(resolve,reject){
		console.log("Sending to chathandler !!!!");
		chatHandler.fillList(req,res,resolve,reject);
	}).catch(function(err){
		console.log("ERROR ERROR Sending to chathandler !!!!"+err);
	});
});


app.post('/public_html', function(req,res){
	res.sendFile("/public_html/"+req.body.value,{root:__dirname});
});

app.post('/signUpUser',function(req,res){
	console.log("SIGN UP USER : "+req.query.signUpUser);
	var p = new Promise(function(resolve,reject){
	userHandler.addUser(req.query.signUpUser,resolve,reject);
	});
	p.then(function(){
		res.end();
	});
	p.catch(function(){
		console.log("DB ERROR IN USER INSERTION");
		res.end();});
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
	var p = new Promise(function(resolve,reject){	
	reqHandler.validateRequest(req,res,resolve,reject);
	});
	p.then(function(){
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