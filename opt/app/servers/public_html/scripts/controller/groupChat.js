mistApp.controller('GroupChatController',['$http','$scope',function($http,$scope){
	var roomData = {roomName : 'test1', roomDesc: 'Test room dummy room'};
	$scope.createGroupRoom = function(){
		$http({method: 'POST', url : CURRENT_URL+'/createGroupRoom', params : {room: roomData}}).
		then(function(res){

		}).catch(function(err){

		});
	};
}]);