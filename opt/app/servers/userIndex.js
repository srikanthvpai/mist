var http = require("http");
var fs = require("fs");
var Promise = require("bluebird");
var url = require('url');

Promise.promisifyAll(fs);
var userIndex;
function changeUserIndex()
{
	
	fs.readFileAsync("./data/userIndex.json","UTF-8").then(
		function (content){ readUserIndex(content);}).then(
		function (){ 
			writeUserIndex(); 
		}).catch(function(e){
			console.log("ERROR : ERROR : +"+e);
		});
	}

function readUserIndex(content)
{
		console.log("READING CONTENT : "+content);
		var data = JSON.parse(content);
		userIndex = data[0]["userIndex"];
		console.log(userIndex);
}

function writeUserIndex()
{
	var newContent;
	if(userIndex===1)
	{
	newContent = [{"userIndex": -1}];
	}
	else if(userIndex=== -1)
	{
	newContent = [{"userIndex": 1}];
	}
	else if(userIndex=== 0)
	{
	newContent = [{"userIndex": 0}];
	}
	fs.writeFile("./data/userIndex.json",JSON.stringify(newContent));
}
http.createServer(function(req,res)
{
	var query = url.parse(req.url,true)["query"];
	var userType = query.userId;
	var userIndexNormal = {userIndex : 1};
	var userIndexAdmin = {userIndex :  1};
	console.log("USER ID : "+query.userId);
	fs.readFile("./data/userIndex.json","UTF-8", function(err,content)
			{
				var data = JSON.parse(content);
				changeUserIndex();
				res.writeHead(200,{"Content-Type": "text/json","Access-Control-Allow-Origin":"*"});
				console.log("Sending Content for userId: "+userType);
				if(userType === 'administrator')
				{
	   				res.end(JSON.stringify(userIndexAdmin));
				}
				else
				{
	   				res.end(JSON.stringify(userIndexNormal));
				}
			});
}).listen(3001);

console.log('Listening on Port 3001');