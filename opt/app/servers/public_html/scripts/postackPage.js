mistApp.controller('PostController',['$scope','$http',function($scope,$http){

	$scope.midTemplate = {url:  '/views/quest-list.html'};
	$http.get(CURRENT_URL+'/data/',{params: {fileName: 'questSubjects.json'}}).
	then(function(data){
		$scope.questSubjects = data.data;
	});
	$http({method: 'GET',url: CURRENT_URL+'/data/',
	params: {fileName: 'questionsList.json'}
	}).then(function(data){
		$scope.questionsList = data.data;
	});
	$http.get(CURRENT_URL+'/data/',{params: {fileName: 'questionsList.json'}}).
	then(function(data){
		console.log(data.data);
		$scope.popQuestions = data.data;
	});
	$scope.switchMidView = function(tab) {	
		console.log("I am in tab"+tab);
		(tab === 'postTopic') ? $scope.midTemplate.url = '/views/post-topic.html' :
		(tab === 'listTopic') ?	$scope.midTemplate.url = '/views/topic-list.html':
		(tab === 'displayTopic')? $scope.midTemplate.url = '/views/topic-main.html': $scope.midTemplate.url = null;
		}

}]);