var UserHandler = function() {
	var DBService = require('../service/dbService.js');
	this.Promise = require('bluebird');
	this.dbService = new DBService();

};

UserHandler.prototype.saveUserToDB =  function(userObject,callback,callbackerr){
	var query = "insert into mist01.mistuser(first_name,last_name,birth_date,join_date,email_id,firebase_id,password)";
	query+= "values('"+capitalize_Words(userObject.firstName);
	query+= "','"+capitalize_Words(userObject.lastName);
	query+= "',STR_TO_DATE('"+userObject.birthDate+"', '%Y,%m,%d %H,%i,%s')";
	query+= ",SYSDATE(),'"+userObject.email;
	query+= "','"+userObject.firebaseUid;
	query+="','"+userObject.pwd+"');";
	this.dbService.executeQuery(query,callback,callbackerr);
};

UserHandler.prototype.addUser = function(signUpUser,callback,callbackerr){
	var userObj = JSON.parse(signUpUser);
	for(var property in userObj)
	{
		console.log(property+ ": "+userObj[""+property]);
	}
	userObj.birthDate = '1987,11,13 17,30,22';
	userObj.pwd = 'FAKE-FAKE';
	this.saveUserToDB(userObj,callback,callbackerr);
};

UserHandler.prototype.fetchUser = function(firebaseUid,callback,callbackerr){
	var query = "select first_name,last_name,birth_date,join_date,email_id,firebase_id ";
	query+= "from mist01.mistuser where binary firebase_id='";
	query+= firebaseUid;
	query+= "' LIMIT 1";
	console.log("Inside USER HANDLER doing !!!!");
	this.dbService.executeQueryFetch(query,callback,callbackerr);
	/*.then(function(resultSet){
		return resultSet;
	}).catch(function(err){
		console.log("ERROR IS : "+err);
	});*/
};

function capitalize_Words(str)  
{  
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});  
} 

module.exports = UserHandler;

