mistApp.controller('ChatController',['$scope','$cookies','Authentication','$http','$rootScope',
	function($scope,$cookies,Authentication,$http,$rootScope){
	console.log("Going thru chat controller ");
	$scope.chatBar = $cookies.get('mistTrack') ? {url: "views/chatBar.html"}: {url: ""};
	initiateChatBar();
	$scope.$on("userAuth",function(event,userObj) {
		console.log("Listened to user authentication");
		$scope.chatBar = {url: "views/chatBar.html"};

 	console.log("user obj : "+$rootScope.currentUserObj);
 	$scope.currentUserObj = $rootScope.currentUserObj;
	$http({method: 'GET', url: CURRENT_URL+'/chatList',params:{userData : $rootScope.currentUserObj}}).
	then(function(res){
		console.log(res.data);
		$scope.chatList = res.data;
	}).
	catch(function(err){
	console.log("Error trying to fill user data !!!");	
	});
		
	});
	$scope.initiate_chat = function(participantA,participantB){
	 	chatBoxHandler.initiate_chat(participantA,participantB);
	};
	$scope.$on("userNotAuth",function(event,args) {
		$scope.chatBar = {url: ""};
	});
}]);