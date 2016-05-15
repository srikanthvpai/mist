mistApp.controller('QuestController',['$scope','$http',function($scope,$http){
	console.log("going thru quest control");
	$scope.midTemplate = {url:  '/views/quest-list.html'};
	$http.get(CURRENT_URL+'/data/',{params: {fileName: 'questSubjects.json'}}).
	then(function(res){
		console.log("GETTING QUESTION LIST "+res.data);
		$scope.questSubjects = res.data;
	});
	$http({method: 'GET',url: CURRENT_URL+'/data/',
	params: {fileName: 'questionsList.json'}
	}).then(function(res){
		$scope.questionsList = res.data;
	});
	$http.get(CURRENT_URL+'/data/',{params: {fileName: 'questionsList.json'}}).
	then(function(res){
		console.log(res.data);
		$scope.popQuestions = res.data;
	});
	$scope.switchMidView = function(tab) {	
		console.log("I am in tab"+tab);
		(tab === 'askQuest') ? $scope.midTemplate.url = '/views/quest-ask.html' :
		(tab === 'listQuest') ?	$scope.midTemplate.url = '/views/quest-list.html':
		(tab === 'displayQuest')? $scope.midTemplate.url = '/views/quest-main.html': $scope.midTemplate.url = null;
		}

}]);