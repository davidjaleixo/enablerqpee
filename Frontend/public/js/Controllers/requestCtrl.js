/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining requestCtrl");
angular.module('mainApp')
.controller('requestCtrl', function($scope, $routeParams, $http, appService, $timeout) {
	$scope.SubjectName = $routeParams.subjectname;
	$scope.CollectionName = $routeParams.collectionname;
	$scope.requestID = $routeParams.requestid;
	$scope.requestconditions =[];
	$scope.data = false;
	$scope.msgData = false;
	$scope.msgDataEdit = false;
	$scope.successDescription = 0;
	$scope.successValue = 0;
	$scope.description = null;
	$scope.key = null;
	$scope.condition = null;
	$scope.value = null;
	$scope.successDescriptionEdit = 0;
	$scope.successValueEdit = 0;
	$scope.descriptionEdit = null;
	$scope.keyEdit = null;
	$scope.conditionEdit = null;
	$scope.valueEdit = null;

	appService.getRequestNamebyID($routeParams.requestid).then(function(response){
		if(response.data.Result){
			if(response.data.data.length > 0){
				console.log("getRequestNamebyID response: " + JSON.stringify(response.data));
				$scope.RequestName = response.data.data[0].requestID;
			}
		}
	});
	appService.getRequestConditions($routeParams.requestid).then(function(response){
		if(response.data.Result){
			if(response.data.data.length > 0){
				console.log("getRequestConditions response: " + JSON.stringify(response.data));
				$scope.requestconditions = response.data.data;
			}
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	console.log("Running requestCtrl... ");
	$scope.delete = function (requestConditionsID) {
		appService.deleteRequestConditions(requestConditionsID).then(function(response){
			if(response.data.Result){
				console.log("deleteRequest response: " + JSON.stringify(response.data));
				//Delete requestConditionsID from $scope
				angular.forEach($scope.requestconditions, function(requestcondition, index){
					if(requestcondition.requestConditionsID == requestConditionsID){
						$scope.requestconditions.splice(index,1);
					}
				})		
			}
		})
	};
	$scope.postdataNewRequestCondition = function (description, key, condition, value) {
		$scope.successDescription = 0;
		$scope.successValue = 0;
		if(description == null){
			$scope.successDescription = 2;
		}else if(value == null){
			$scope.successValue = 2;
		}else if((key == "StatusCode" || key == "BodyLength" || key == "TimeResponse") && isNaN(parseFloat(value))){
			$scope.successValue = 3;
		}else{
			$scope.successDescription = 1;
			$scope.successValue = 1;

			var body = {
				description: description,
				keySubject: key,
				keyCondition: condition,
				value: value,
				requestID: $routeParams.requestid
			};
			appService.createRequestCondition(body).then(function(response) {
				if(response.data.Result){
					console.log("Post Data Submitted Successfully!");
					$scope.msgData = true;
					$scope.msg = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/"+$routeParams.requestid+"/conditions" 
				}else{
					$scope.msgData = true;
					$scope.msg = response.data.Reason;
				}
			});
		}
	};
	$scope.postdataEditRequestCondition = function (requestConditionsID, description, key, condition, value) {
		$scope.successDescriptionEdit = 0;
		$scope.successValueEdit = 0;
		if(description == null){
			$scope.successDescriptionEdit = 2;
		}else if(value == null){
			$scope.successValueEdit = 2;
		}else if((key == "StatusCode" || key == "BodyLength" || key == "TimeResponse") && isNaN(parseFloat(value))){
			$scope.successValueEdit = 3;
		}else{
			$scope.successDescriptionEdit = 1;
			$scope.successValueEdit = 1;

			var body = {
				id: requestConditionsID,
				newdescription: description,
				newkey: key,
				newCondition: condition, 
				newvalue: value
			};
			appService.editRequestCondition(body).then(function(response) {
				if(response.data.Result){
					console.log("Put Data Submitted Successfully!");
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/"+$routeParams.requestid+"/conditions" 
				}else{
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
				}
			});
		}
	};
	$scope.dataRequestConditionsModal = function (requestConditionsID, description, key, condition, value) {
		$scope.requestConditionsID = requestConditionsID;
		$scope.descriptionEdit = description;
		$scope.keyEdit = key;
		$scope.conditionEdit = condition;
		$scope.valueEdit = value;
	};
	console.log("Loading requestCtrl");
});