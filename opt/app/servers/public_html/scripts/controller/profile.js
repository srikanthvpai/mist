mistApp.controller('ProfileController',['$scope','$cookies','$http','$rootScope','Authentication','$window','$location',
function($scope,$cookies,$http,$rootScope,Authentication,$window,$location){
	$scope.user = {};
	$scope.user.firstName = "Sara";
	$scope.user.lastName = "Lee";
	$scope.user.email = "saralee@gmail.com";
	$scope.user.dob = "Nov 13 1988, EDT NewYork";
	$scope.user.group = "IBM";
	console.log("IA M HERE!!!!!");
	$scope.memberList = [0,1,2,3,4,5,6,7,8,9,10,11,12];

	var currentUserObj = JSON.parse($window.sessionStorage.getItem("currentUserObj"));

	$http({method: 'GET',url : CURRENT_URL+"/myFriends",params : {userData: currentUserObj}}).then(function(res){
		console.log(" FILLED DATA : "+res.data);
		$scope.memberList = res.data;
	}).catch(function(err){
		console.log("ERROR TRYING TO FILL FRIENDS LIST");
	});
}]);