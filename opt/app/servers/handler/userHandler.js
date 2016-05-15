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
	return this.dbService.executeQuery(query);
};

UserHandler.prototype.addUser = function(signUpUser){
	var userObj = JSON.parse(signUpUser);
	userObj.birthDate = '1987,11,13 17,30,22';
	userObj.pwd = 'FAKE-FAKE';
	return this.saveUserToDB(userObj);
};

UserHandler.prototype.fetchUser = function(firebaseUid){
	var query = "select first_name,last_name,birth_date,join_date,email_id,firebase_id ";
	query+= "from mist01.mistuser where binary firebase_id='";
	query+= firebaseUid;
	query+= "' LIMIT 1";
	console.log("Inside USER HANDLER doing !!!!");
	return this.dbService.executeQueryFetch(query);
	/*.then(function(resultSet){
		return resultSet;
	}).catch(function(err){
		console.log("ERROR IS : "+err);
	});*/
};

UserHandler.prototype.fillFriends = function(req,res){
	
	var currentUserObj = JSON.parse(req.query.userData);
	check(currentUserObj);
	var query = "select a.first_name,a.last_name,a.email_id,b.group_name from mist01.mistuser AS a ";
	query+="inner join mist01.mistgroup AS b ON a.mistid_group=b.mistid_group where a.firebase_id<>'";
	query += currentUserObj.firebaseId+"'";
	var that = this;
	that.dbService.executeQueryFetch(query,resolve,reject).then(function(resultSet){
		var friendData = [];
		resultSet.forEach(function(userRow){
			var userObj = {};
			userObj.firstName = userRow.first_name;
			userObj.lastName = userRow.last_name;
			userObj.email = userRow.email_id;
			userObj.groupName = userRow.group_name;
			userObj.firebaseId = userRow.firebase_id;
			friendData.push(userObj);
		});
		res.json(friendData);
		console.sent("SENT USER DATA");
	}).catch(function(){
		
	});

};

function check(obj){
	for(var property in obj)
	{
		console.log(property+": "+obj[""+property]);
	}
}

function capitalize_Words(str)  
{  
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});  
} 

module.exports = UserHandler;

