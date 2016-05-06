mistApp.controller('ChatController',['$scope','$cookies','Authentication','$http','$rootScope','$window',
	function($scope,$cookies,Authentication,$http,$rootScope,$window){
	console.log("Going thru chat controller ");
	$scope.chatBar = Authentication.isAuthenticated() ? {url: "views/chatBar.html"}: {url: ""};
	initiateChatBar();
	$scope.$on("userAuth",function(event,userObj) {
		console.log("Listened to user authentication");
		$scope.chatBar = {url: "views/chatBar.html"};
		var currentUserObj = JSON.parse($window.sessionStorage.getItem("currentUserObj"));
 	console.log("user obj : "+currentUserObj);
 	$scope.currentUserObj = currentUserObj;
 	$scope.fillChatBar();
		
	});



	$scope.fillChatBar = function() {
	console.log("Fullfilling chat");
	var currentUserObj = JSON.parse($window.sessionStorage.getItem("currentUserObj"));
	$http({method: 'GET', url: CURRENT_URL+'/chatList',params:{userData : currentUserObj}}).
	then(function(res){
		console.log(" FILLING DATA : "+res.data);
		$scope.chatList = res.data;
	}).
	catch(function(err){
	console.log("Error trying to fill user data !!!");	
	});
	};

	$scope.initiate_chat = function(participantA,participantB){
	 	chatBoxHandler.initiate_chat(participantA,participantB);
	};

	$scope.$on("userNotAuth",function(event,args) {
		$scope.chatBar = {url: ""};
	});
}]);