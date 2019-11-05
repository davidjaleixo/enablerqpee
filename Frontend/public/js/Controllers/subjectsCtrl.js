/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

console.log("Defining subjectsCtrl");
angular.module('mainApp')
.controller('subjectsCtrl', function($scope, $routeParams, $http, appService, $timeout) {
	$scope.SubjectName = $routeParams.subjectname;
	$scope.subject_Name = $routeParams.subjectname;
	$scope.collections =[];
	$scope.data = false;
	$scope.msgData = false;
	$scope.msgDataEdit = false;
	$scope.msgDataEditCollection = false;
	$scope.name = null;
	$scope.description = null;
	$scope.successNameEdit = 0;
	$scope.successDescriptionEdit = 0;
	$scope.nameEditCollection = null;
	$scope.successNameEditCollection = 0;
	$scope.nameNewCollection = null;
	$scope.successnameNewCollection = 0;

	appService.getCollections($routeParams.userid, $routeParams.subjectname).then(function(response){
		if(response.data.Result){
			if(response.data.data.length > 0){
				console.log("getCollections response: " + JSON.stringify(response.data));
				$scope.collections = response.data.data;
			}
		}
	},function(err){
		$scope.data = true;
		$scope.noData = err.data.data;
	});
	console.log("Running subjectsCtrl... ");
	$scope.delete = function (collectionsID) {
		appService.deleteCollections(collectionsID).then(function(response){
			if(response.data.Result){
				console.log("deleteCollections response: " + JSON.stringify(response.data));
				//Delete collectionsID from $scope
				angular.forEach($scope.collections, function(collection, index){
					if(collection.collectionsID == collectionsID){
						$scope.collections.splice(index,1);
					}
				})		
			}
		})
	};
	$scope.postdataNewCollection = function (name) {
		$scope.successnameNewCollection = 0;
		if(name == null){
			$scope.successnameNewCollection = 2;
		}else{
			$scope.successnameNewCollection = 1;

			appService.getSubjectsID($routeParams.userid, $routeParams.subjectname).then(function(response) {
				if(response.data.Result){
					var body = {
						name: name,
						subjectsID: response.data.data
					};
					appService.createCollection(body).then(function(response) {
						if(response.status == 200){
							console.log("Post Data Submitted Successfully!");
							$scope.msgData = true;
							$scope.msg = response.data.Reason;
							window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname
						}else{
							$scope.msgData = true;
							$scope.msg = response.data.Reason;
						}
					});
				}
			});
		}
	};
	$scope.postdataEditSubject = function (name, description) {
		$scope.successNameEdit = 0;
		$scope.successDescriptionEdit = 0;
		if(name == null){
			$scope.successNameEdit = 2;
		}else if(description == null){
			$scope.successDescriptionEdit = 2;
		}else{
			$scope.successNameEdit = 1;
			$scope.successDescriptionEdit = 1;

			appService.getSubjectsID($routeParams.userid, $routeParams.subjectname).then(function(response) {
				if(response.data.Result){
					var body = {
						id: response.data.data,
						newname: name,
						newdescription: description
					};
					appService.editSubject(body).then(function(response) {
						if(response.data.Result){
							console.log("Put Data Submitted Successfully!");
							$scope.msgDataEdit = true;
							$scope.msgEdit = response.data.Reason;
							window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname
						}else{
							$scope.msgDataEdit = true;
							$scope.msgEdit = response.data.Reason;
						}
					});
				}
			});
		}
	};
	$scope.postdataEditCollection = function (collectionsID, name) {
		$scope.successNameEditCollection = 0;
		if(name == null){
			$scope.successNameEditCollection = 2;
		}else{
			$scope.successNameEditCollection = 1;

			var body = {
				id: collectionsID,
				newname: name
			};
			appService.editCollection(body).then(function(response) {
				if(response.data.Result){
					console.log("Put Data Submitted Successfully!");
					$scope.msgDataEditCollection = true;
					$scope.msgEditCollection = response.data.Reason;
					window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname
				}else{
					$scope.msgDataEditCollection = true;
					$scope.msgEditCollection = response.data.Reason;
				}
			});
		}
	};
	$scope.dataModal = function (name, collectionsID) {
		$scope.nameModal = name;
		$scope.collectionsID = collectionsID;
	};
	$scope.manage = function (collectionsName) {
		window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+collectionsName     
	};
	$scope.run = function (collectionsName) {
		window.location = "/"+$routeParams.userid+"/"+$routeParams.subjectname+"/"+collectionsName+"/run"       
	};
	console.log("Loading subjectsCtrl");
});