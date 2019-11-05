/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining userCtrl");
angular.module('mainApp')
.controller('userCtrl', function($scope, $routeParams, $http, appService) {
	$scope.userID = $routeParams.userid;
	$scope.data = false;
	$scope.msgData = false;
	$scope.name = null;
	$scope.successNameNewSubject = 0;
	$scope.description = null;
	$scope.successDescriptionNewSubject = 0;
	$scope.subjects = [];

	console.log("Running userCtrl... ");
	appService.getSubjects($routeParams.userid).then(function(response){
		if(response.data.Result){
			if(response.data.data.length > 0){
				console.log("getSubjects response: " + JSON.stringify(response.data));
				$scope.subjects = response.data.data;
			}
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	$scope.postdata = function (subjectsName) {
		window.location = "/"+$routeParams.userid+"/"+subjectsName
	};
	$scope.postdataSubject = function (name, description) {
		$scope.successNameNewSubject = 0;
		$scope.successDescriptionNewSubject = 0;
		if(name == null){
			$scope.successNameNewSubject = 2;
		}else if(description == null){
			$scope.successDescriptionNewSubject = 2;
		}else{
			$scope.successNameNewSubject = 1;
			$scope.successDescriptionNewSubject = 1;

			var body = {
				name: name,
				description: description,
				userID: $routeParams.userid
			};
			appService.createSubject(body).then(function(response) {
				if(response.data.Result){
					if(response.status == 200){
						console.log("Post Data Submitted Successfully!");
						$scope.msgData = true;
						$scope.msg = response.data.Reason;
						window.location = "/"+$routeParams.userid
					}else{
						$scope.msgData = true;
						$scope.msg = response.data.Reason;
					}
				}
			});
		}
	};
	$scope.delete = function (subjectsID) {
		appService.deleteSubjects(subjectsID).then(function(response){
			if(response.data.Result){
				console.log("deleteSubject response: " + JSON.stringify(response.data));
				//Delete subjectsID from $scope
				angular.forEach($scope.subjects, function(subject, index){
					if(subject.subjectsID == subjectsID){
						$scope.subjects.splice(index,1);
					}
				})		
			}
		})
	};
	console.log("Loading userCtrl");
});