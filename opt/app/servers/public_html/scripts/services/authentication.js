mistApp.factory('Authentication',['$rootScope','$location','$window','$cookies','$firebaseAuth','$firebaseObject','FIREBASE_URL','$http',
	function($rootScope,$location,$window,$cookies,$firebaseAuth,$firebaseObject,FIREBASE_URL,$http){
		
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);
		var currentUserDetails;
		var isAuthenticated = false;
		auth.$onAuth(function(authUser){
			if(authUser){
				var userRef = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
				var userObj = $firebaseObject(userRef);
				$rootScope.currentUser = userObj;
				$rootScope.currentUserDetails = currentUserDetails;
			}
			else
			{
				console.log('DID NOT GET USER OBJECT');
				$rootScope.currentUser = '';
			}			
		});

		var setUserData = function(){

		};
		
		return {
			signIn : function(signIn){
				auth.$authWithPassword({
					email: signIn.email,
					password: signIn.pwd
				}).then(function(authData){
					console.log("Auth Data : "+authData);
					 $http({method: 'POST',url: CURRENT_URL+'/authSuccess',params:{userData : authData}}).
					 then(function(res){
					 	if($cookies.get('mistTrack'))
					 	{
					 		isAuthenticated = true;
					 		$window.sessionStorage.setItem("currentUserObj",JSON.stringify(res.data));
					 		$rootScope.currentUserObj = res.data;
						 	$rootScope.$broadcast('userAuth',res.data);
						 	$location.path('/homePage');
					 	}
					 	else
					 	{
					 		isAuthenticated = false;
					 		console.log("Mist server denied authorization");
					 		alert("Login Error : Authentication denied");
					 		$window.sessionStorage.setItem("currentUserObj","");
					 		$location.path('/login');
					 	}
					 }).catch(function(err){
					 	isAuthenticated = false;
					 	$window.sessionStorage.setItem("currentUserObj","");
					 	$rootScope.currentUserObj = "";
					 	$rootScope.$broadcast('userNotAuth',{user:null});
					 	alert("Login Error : Please contact Sys Admin");
					 });
					
				}).catch(function(err){
					isAuthenticated = false;
					console.log("Error during authentication 222: "+err);
					$cookies.put('mistTrack',null);
					$window.sessionStorage.setItem("currentUserObj","");
					$rootScope.currentUserObj = "";
					$location.path('/error');
				});
			},
			signOut: function() {
				$cookies.remove('mistTrack');
				isAuthenticated = false;
				$rootScope.$broadcast('userNotAuth',{user:null});
				$window.sessionStorage.setItem("currentUserObj","");
				$rootScope.currentUserObj = "";
				close_allchatBoxes();
				$location.path('/login');
				return auth.$unauth();
			},
			signUpRegister: function (signUp) {
				console.log("Form Submitted");
				$rootScope.signUpMessage = "";
				$rootScope.submitResult = false;
				auth.$createUser({
					email: signUp.email,
					password: signUp.pwd1,
				}).then(function(regUser){

				var userObject = {
						firstName: signUp.firstName,
						lastName: signUp.lastName,
						email: signUp.email,
						date: Firebase.ServerValue.TIMESTAMP,
						firebaseUid: regUser.uid
				};
				var regRef = new Firebase(FIREBASE_URL+"users")
				.child(regUser.uid).set(userObject);
				$http({method: 'POST',url: CURRENT_URL+'/signUpUser',params: {signUpUser: userObject}}).then(function(data){

				$rootScope.signUpMessage = "Thank you "+capitalize_Words(signUp.firstName)+" for registering with Mingle Stack";
				$rootScope.submitResult = true;
				
				});

				}).catch(function(error){
					$rootScope.signUpMessage = error.message;
					$rootScope.submitResult = false;
				});

			},
			isAuthenticated: function() {
				var check = $cookies.get('mistTrack') ? true:false;
				return check;
			}
		}
}]);


