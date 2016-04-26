var RequestHandler = function() {
	var UserHandler = require('./userHandler.js');
	this.userHandler = new UserHandler();
	this.Promise = require('bluebird');
	this.counter = 0;
};

RequestHandler.prototype.validateRequest = function(req,res,callback,callbackerr) {
	var mistTrackCookie = req.cookies.mistTrack;
	if(mistTrackCookie)
	{
		console.log("DE-AUTHENTIFYING!!!!");
		//res.clearCookie('mistTrack');
	}
	else
	{
		console.log("not able to DE-AUTHENTIFYING!!!! : "+mistTrackCookie);
	}
	//res.redirect('/mainPage.html#/login');
	callback();
};


RequestHandler.prototype.authorizeUser = function(req,res) {

	console.log("Request authData: "+req.query.userData);
	var userDataObj = JSON.parse(req.query.userData);
	this.Promise.promisifyAll(this.userHandler);
	var that = this;
	var p = new Promise(function(resolve,reject){
		console.log("Inside authorization!!!");
		that.userHandler.fetchUser(userDataObj.uid,resolve,reject);
	});
	p.then(function(resultSet){
		console.log("Got result set !!!!"+resultSet);
		if(resultSet[0])
		{
			var userObj = {};
			userObj.firstName = resultSet[0].first_name;
			userObj.lastName = resultSet[0].last_name;
			userObj.email = resultSet[0].email_id;
			userObj.firebaseId = resultSet[0].firebase_id;
			console.log("USER FOUND !!!");
			res.cookie("mistTrack",resultSet[0].firebase_id);
			res.json(userObj);
		}
		else
		{
			console.log("USER NOT FOUND !!!");
			res.end();
		}

	});
	p.catch(function(err){
		console.log("ERROR DURING DB FETCH "+err);
	});
};

RequestHandler.prototype.generateSessionId = function(){
	this.counter++;
	return ""+this.counter;
}

module.exports = RequestHandler;
