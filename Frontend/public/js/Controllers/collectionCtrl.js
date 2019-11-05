/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining collectionCtrl");
angular.module('mainApp')
.controller('collectionCtrl', function($scope, $routeParams, $http, appService, $timeout) {
	$scope.SubjectName = $routeParams.subjectname;
	$scope.CollectionName = $routeParams.collectionname;
	$scope.request =[];
	$scope.data = false;
	$scope.msgData = false;
	$scope.msgDataEdit = false;
	$scope.url = null;
	$scope.successURL = 0;
	$scope.urlEdit = null;
	$scope.successURLEdit = 0;
	$scope.payload = null;
	$scope.successPayload = 0;
	$scope.payloadEdit = null;
	$scope.successPayloadEdit = 0;

	appService.getRequest($routeParams.userid, $routeParams.subjectname, $routeParams.collectionname).then(function(response){
		if(response.data.Result){
			if(response.data.data.length > 0){
				console.log("getRequest response: " + JSON.stringify(response.data));
				$scope.request = response.data.data;
			}
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	console.log("Running collectionCtrl... ");
	$scope.delete = function (requestID) {
		appService.deleteRequest(requestID).then(function(response){
			if(response.data.Result){
				console.log("deleteRequest response: " + JSON.stringify(response.data));
				//Delete requestID from $scope
				angular.forEach($scope.request, function(request, index){
					if(request.requestID == requestID){
						$scope.request.splice(index,1);
					}
				})		
			}
		})
	};
	$scope.postdataNewRequest = function (url, method, raw, payload) {
		$scope.successURL = 0;
		$scope.successPayload = 0;
		if(url == null){
			$scope.successURL = 2;
		}else if(payload == null){
			$scope.successPayload = 2;
		}else if(raw == "application/json" && isJSON(payload) == false){
			$scope.successPayload = 3;
		}else{
			var newPayload = payload.replace(/\n/g,"");
			$scope.successURL = 1;
			$scope.successPayload = 1;
			appService.getCollectionsID($routeParams.userid, $routeParams.subjectname, $routeParams.collectionname).then(function(response) {
				if(response.data.Result){
					if(raw == "application/json"){
						var body = {
							collectionid: response.data.data,
							url: url,
							method: method,
							raw: raw,
							payload: JSON.parse(newPayload)
						}
					}else{
						var body = {
							collectionid: response.data.data,
							url: url,
							method: method,
							raw: raw,
							payload: newPayload
						}
					}
					appService.createRequest(body).then(function(response) {
						if(response.data.Result){
							console.log("Post Data Submitted Successfully!");
							$scope.msgData = true;
							$scope.msg = response.data.Reason;
							window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname 
						}else{
							$scope.msgData = true;
							$scope.msg = response.data.Reason;
						}
					});
				}
			});
		}
	};
	$scope.postdataEditRequest = function (url, method, raw, payload, requestID) {
		$scope.successURL = 0;
		$scope.successPayloadEdit = 0;
		if(url == null){
			$scope.successURLEdit = 2;
		}else if(payload == null){
			$scope.successPayloadEdit = 2;
		}else if(raw == "application/json" && isJSON(payload) == false){
			$scope.successPayloadEdit = 3;
		}else{
			var newPayload = payload.replace(/\n/g,"");
			$scope.successURLEdit = 1;
			$scope.successPayloadEdit = 1;

			if(raw == "application/json"){
				var body = {
					id: requestID,
					newurl: url,
					newmethod: method,
					newraw: raw,
					newpayload: JSON.parse(newPayload)
				}
			}else{
				var body = {
					id: requestID,
					newurl: url,
					newmethod: method,
					newraw: raw,
					newpayload: newPayload
				}
			}
			appService.editRequest(body).then(function(response) {
				if(response.data.Result){
					console.log("Put Data Submitted Successfully!");
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname
				}else{
					$scope.msgDataEdit = true;
					$scope.msgEdit = response.data.Reason;
				}
			});
		}
	};
	$scope.dataRequestModal = function (url, method, raw, payload, requestID) {
		$scope.urlEdit = url;
		$scope.methodEdit = method;
		$scope.payloadEdit = payload;
		$scope.requestID = requestID;
		$scope.rawEdit = raw;
	};
	$scope.view = function (requestID) {
		window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+$routeParams.collectionname+"/"+requestID+"/conditions"     
	};
	function isJSON(str) {
		try {
			return (JSON.parse(str) && !!str);
		}catch (e) {
			return false;
		}
	};
	console.log("Loading collectionCtrl");
});