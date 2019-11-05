/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining runCtrl");
angular.module('mainApp')
.controller('runCtrl', function($scope, $routeParams, $http, appService, $timeout) {
	$scope.SubjectName = $routeParams.subjectname;
	$scope.CollectionName = $routeParams.collectionname;
	$scope.activity =[];
	$scope.data = false;
	$scope.msgData = false;
	$scope.msgDataEdit = false;
	$scope.countEdit = null;
	$scope.successCountEdit = 0;
	$scope.count = null;
	$scope.successCount = 0;
	$scope.request = null;
	$scope.successRequest = 0;

	appService.getRequest($routeParams.userid, $routeParams.subjectname, $routeParams.collectionname).then(function(response){
		if(response.data.Result){
			console.log("getRequest response: " + JSON.stringify(response.data));
			$scope.requests = response.data.data;
		}
	});
	appService.getActivity($routeParams.userid, $routeParams.subjectname, $routeParams.collectionname).then(function(response){
		if(response.data.Result){
			console.log("getActivity response: " + JSON.stringify(response.data));
			$scope.activity = response.data.data;
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	console.log("Running runCtrl... ");
	$scope.delete = function (activityID) {
		appService.deleteActivity(activityID).then(function(response){
			if(response.data.Result){
				console.log("deleteActivity response: " + JSON.stringify(response.data));
				//Delete activityID from $scope
				angular.forEach($scope.activity, function(activity, index){
					if(activity.activityID == activityID){
						$scope.activity.splice(index,1);
					}
				})		
			}
		})
	};
	$scope.run = function () {
		appService.performanceTest($routeParams.userid, $routeParams.subjectname, $routeParams.collectionname).then(function(response) {
			console.log("response: " + JSON.stringify(response));
			if(response.status == 200){
				window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/run" 
			}
		});
	};
	$scope.postdataNewActivity = function (request, count) {
		$scope.successCount = 0;
		$scope.successRequest = 0;
		if(count == null){
			$scope.successCount = 2;
		}else if(isNaN(parseFloat(request))){
			$scope.successRequest = 2;
		}else{
			$scope.successCount = 1;
			$scope.successRequest = 1;
			var body = {
				count: count,
				requestID: request
			};
			appService.createActivity(body).then(function(response) {
				if(response.data.Result){
					console.log("Post Data Submitted Successfully!");
					$scope.msgData = true;
					$scope.msg = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/run" 
				}else{
					$scope.msgData = true;
					$scope.msg = response.data.Reason;
				}
			});
		}
	};
	$scope.postdataEditActivity = function (activityID, countEdit) {
		$scope.successCountEdit = 0;
		if(countEdit == null){
			$scope.successCountEdit = 2;
		}else{
			$scope.successCountEdit = 1;
			var body = {
				id: activityID,
				newcount: countEdit
			};
			appService.editActivity(body).then(function(response) {
				if(response.data.Result){
					console.log("Put Data Submitted Successfully!");
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/run" 
				}else{
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
				}
			});
		}
	};
	$scope.dataEditModal = function (activityID, count, requestID) {
		$scope.activityID = activityID;
		$scope.requestID = requestID;
		$scope.countEdit = count;
	};
	$scope.history = function (activityID) {
		window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/"+activityID+"/history"     
	};
	console.log("Loading runCtrl");
});