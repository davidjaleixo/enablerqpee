/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining historyCtrl");
angular.module('mainApp')
.controller('historyCtrl', function($scope, $routeParams, $http, appService, $timeout) {
	$scope.SubjectName = $routeParams.subjectname;
	$scope.CollectionName = $routeParams.collectionname;
	$scope.ActivityID = $routeParams.activityid;

	appService.getStatusList($routeParams.activityid).then(function(response){
		if(response.data.Result){
			console.log("getRequest response: " + JSON.stringify(response.data));
			$scope.statuslist = response.data.data;
			$scope.total = response.data.data[response.data.data.length - 1].Total;
			$scope.success = response.data.data[response.data.data.length - 1].Success;
			$scope.failed = response.data.data[response.data.data.length - 1].Failed;
			$scope.percentage = response.data.data[response.data.data.length - 1].Percentage;
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	console.log("Running historyCtrl... ");
	console.log("Loading historyCtrl");
});