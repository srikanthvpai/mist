mistApp.controller('GroupChatController',['$http','$scope','$window',function($http,$scope,$window){
	//$scope.fillRooms();
	$scope.activeRoom =  {roomId : 1,roomName: 'test105-06-2016 17:33:49',roomDesc: 'Test room dummy room'};
	$scope.createGroupRoom = function(){

		var roomData = {roomName : $scope.createRoom.name, roomDesc: $scope.createRoom.desc};
		$http({method: 'POST', url : CURRENT_URL+'/createGroupRoom', params : {userData: $scope.currentUserObj,room: roomData}}).
		then(function(res){
			console.log("RES DATA "+res.data.roomId);

		}).catch(function(err){

		});
	};
	$scope.fillRooms = function(){
		$http({method: 'GET', url: CURRENT_URL+'/groupList',params: {userData: $scope.currentUserObj}}).then(function(res){
			$scope.groupList = res.data;
		}).catch(function(err){

		});
	};
	$scope.fillRoomData = function(roomId,roomName,roomDesc){
		$scope.activeRoom.roomId = roomId;
		$scope.activeRoom.roomName = roomName;
		$scope.activeRoom.roomDesc = roomDesc;
		$scope.closeSocket();
		$scope.initializeSocket($scope.activeRoom.roomId);
		console.log("ROOM ID : "+$scope.activeRoom.roomId);
		$http({method: 'GET', url: CURRENT_URL+'/groupMessages',params: {userData: $scope.currentUserObj, roomId: $scope.activeRoom.roomId}}).then(function(res){
			$scope.emptyMessagesLayer();
			$scope.grpMsgList = res.data;
			console.log(" RES DATA : "+res.data);
			$scope.grpMsgList.forEach(function(item){
				console.log("ITEM : "+item.msgtext+" author : "+item.author);
				groupChatHandler.drawMessage(item.msgtext);
			});
		}).catch(function(err){
			console.log("ERROR "+err);
		});

		$http({method: 'GET', url: CURRENT_URL+'/groupUserList',params: {userData: $scope.currentUserObj, roomId: $scope.activeRoom.roomId}}).then(function(res){
			$scope.emptyGroupUserLayer();
			$scope.grpUserList = res.data;
		}).catch(function(err){
			console.log("ERROR "+err);
		});

	};
	$scope.subscribe = function() {
		$http({method: 'POST', url: CURRENT_URL+'/subscribeToGrp',params: {userData: $scope.currentUserObj,roomNumber: roomId}}).then(function(res){
			$scope.groupList = res.data;
		}).catch(function(err){
				console.log("ERROR "+err);
		});
	};
	$scope.initializeSocket = function(roomId) {
		$scope.socket = io(CURRENT_URL+'/groupRoom');
		var roomUserData = {"user": $scope.currentUserObj,"roomId": 1};
		$scope.socket.emit("initialize",JSON.stringify(roomUserData));
		$scope.socket.on("message",function(roomMsgObj){
			var roomMsg = JSON.parse(roomMsgObj);
			groupChatHandler.drawMessage(roomMsg.msgText);
		});
	};

	$scope.emptyMessagesLayer = function() {
		var canvasLayer = angular.element(document.querySelector('#canvasLayer'));
		canvasLayer.empty();
	};

	$scope.closeSocket = function() {
		if($scope.socket)
			$scope.socket.close();
	};

	$scope.emptyGroupUserLayer = function(){
		/*var groupUserDiv = angular.element(document.querySelector('#userListDiv'));
		groupUserDiv.empty();*/
		$scope.grpUserList = [];
	};

	$scope.unSubscribe = function() {

	};

	$scope.displayGroup = function(){

	};
	$scope.sendGroupMessage = function(){
		
		var inputMsg = $scope.grpMsg;
		console.log(inputMsg);
		var transmitObject = {msgText: inputMsg, roomId: 1,author: $scope.currentUserObj};
		if(typeof $scope.socket != 'undefined'){
			$scope.socket.emit("message",JSON.stringify(transmitObject));
		}
	};

	$scope.currentUserObj = JSON.parse('{"firstName":"Srikanth","lastName":"Pai","email":"srikanthvpai@gmail.com","firebaseId":"b30daa19-5a87-4803-a42b-f0ed9e72fdb8"}');
	$scope.fillRooms();
	$scope.emptyMessagesLayer();
	$scope.emptyGroupUserLayer();
	$scope.fillRoomData($scope.activeRoom.roomId,$scope.activeRoom.roomName,$scope.activeRoom.roomDesc);


}]);