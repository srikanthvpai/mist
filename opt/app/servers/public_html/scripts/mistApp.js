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

	$scope.header = $cookies.get('mistTrack') ? {url: "views/mainHeader.html"} : {url: "views/loginHeader.html"};
	$scope.$on("userAuth",function(event,args) {
		$scope.header = {url: "views/mainHeader.html"};
		$scope.displayName = $rootScope.currentUserObj.firstName+" "+$rootScope.currentUserObj.lastName;
	});
	$scope.$on("userNotAuth",function(event,args) {
		$scope.header = {url: "views/loginHeader.html"};
		$scope.displayName = '';
	});
	console.log("Going thru this!!"+$cookies.get('mistUserEmail'));
	$scope.displayName = '';
	$scope.signOut = function () {
		Authentication.signOut();
	};

}]);

mistApp.controller('FooterController',['$scope','$cookies',function($scope,$cookies){
	$scope.footer = {url: "views/footer.html"};
}]);


mistApp.controller('ChatController',['$scope','$cookies','Authentication',function($scope,$cookies,Authentication){
	//console.log("Authentication state : "+Authentication.isAuthenticated());
	$scope.chatBar = $cookies.get('mistTrack') ? {url: "views/chatBar.html"}: {url: ""};
	$scope.$on("userAuth",function(event,args) {
		$scope.chatBar = {url: "views/chatBar.html"};
		initiateChatBar();
	});
	$scope.$on("userNotAuth",function(event,args) {
		$scope.chatBar = {url: ""};
	});
}]);