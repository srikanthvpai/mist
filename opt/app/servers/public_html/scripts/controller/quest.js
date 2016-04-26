var quest = angular.module('quest',[]);
quest.controller('QuestController', function QuestController($scope,$http){
	$http.get(CURRENT_URL+'/data/topics.json').success(function(data){
		$scope.topics = data;
	});
});