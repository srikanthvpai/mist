mistApp.controller('SignUpController',['$scope','Authentication',
	function($scope,Authentication){

	$scope.signUpRegister = function () {
			Authentication.signUpRegister($scope.signUp);					
		};

	}]);

mistApp.controller('SignInController',['$scope','Authentication',
	function($scope,Authentication){
		$scope.signIn = function () {
			Authentication.signIn($scope.signInInfo);					
		};
		
}]);

mistApp.controller('LoginRegController',['$scope', function($scope){


}]);