var mistApp = angular.module('mistApp',['ngRoute','firebase','ngCookies']).
constant('FIREBASE_URL','https://mist01.firebaseio.com/');

mistApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/login', {
		templateUrl: 'views/loginPage.html',
	}).
	when('/register', {
		templateUrl: 'views/loginPage.html',
	}).
	when('/homePage',{
		templateUrl: 'views/homePage.html'
	}).
	when('/queStack',{
		templateUrl: 'views/quest-index.html'
	}).
	when('/poStack',{
		templateUrl: 'views/post-index.html'
	}).
	when('/profile',{
		templateUrl: 'views/profile-index.html'
	}).
	otherwise({
		redirectTo: '/login'
	})
}]);

mistApp.controller('UserDataController',['$scope','$rootScope','$cookies','Authentication','$window','$location',function($scope,$rootScope,$cookies,Authentication,$window,$location){
	var userObjString = $window.sessionStorage.getItem("currentUserObj");
	console.log("USER OBJ STRING "+userObjString);
	if(userObjString && userObjString.length > 0)
	{
	var currentUserObj = JSON.parse(userObjString);
	$scope.displayName = currentUserObj.firstName+" "+currentUserObj.lastName;
	}
	$scope.header = Authentication.isAuthenticated() ? {url: "views/mainHeader.html"} : {url: "views/loginHeader.html"};
	$scope.headerSW = Authentication.isAuthenticated() ? {url: "views/headerSW.html"} : {url: ""};
	$scope.$on("userAuth",function(event,args) {
		$scope.header = {url: "views/mainHeader.html"};
		$scope.headerSW = {url: "views/headerSW.html"};
		var currentUserObjNow = JSON.parse($window.sessionStorage.getItem("currentUserObj"));
		$scope.displayName = currentUserObjNow.firstName+" "+currentUserObjNow.lastName;
	});
	$scope.$on("userNotAuth",function(event,args) {
		$scope.header = {url: "views/loginHeader.html"};
		$scope.headerSW = {url: ""};
		$scope.displayName = '';
	});
	console.log("Going thru this!!"+$cookies.get('mistUserEmail'));
	$scope.signOut = function () {
		Authentication.signOut();
		$scope.displayName = '';
	};
}]);

mistApp.controller('FooterController',['$scope','$cookies',function($scope,$cookies){
	$scope.footer = {url: "views/footer.html"};
}]);


mistApp.controller('ChatBarController',['$scope','$cookies','Authentication',function($scope,$cookies,Authentication){
	//console.log("Authentication state : "+Authentication.isAuthenticated());
	$scope.chatBar = Authentication.isAuthenticated() ? {url: "views/chatBar.html"}: {url: ""};
	$scope.$on("userAuth",function(event,args) {
		$scope.chatBar = {url: "views/chatBar.html"};
		initiateChatBar();
	});
	$scope.$on("userNotAuth",function(event,args) {
		$scope.chatBar = {url: ""};
	});
}]);