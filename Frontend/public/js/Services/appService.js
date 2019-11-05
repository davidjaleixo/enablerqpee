/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

angular.module('mainApp')
.factory('appService', function($http){
	return {
		//Create Subject
		createSubject: function(body){
			return $http.post('/api/vf-os-enabler/subject/create/', JSON.stringify(body))
		},
		//Create Collection
		createCollection: function(body){
			return $http.post('/api/vf-os-enabler/collection/create/', JSON.stringify(body))
		},
		//Create Request
		createRequest: function(body){
			return $http.post('/api/vf-os-enabler/request/create/', JSON.stringify(body))
		},
		//Create RequestCondition
		createRequestCondition: function(body){
			return $http.post('/api/vf-os-enabler/condition/create/', JSON.stringify(body))
		},
		//Create Activity
		createActivity: function(body){
			return $http.post('/api/vf-os-enabler/activity/create/', JSON.stringify(body))
		},
		//Create Perfomance Test by User ID, Subject Name and Collection Name
		performanceTest: function(userid, subjectname, collectionname){
			return $http.post('/api/vf-os-enabler/performance/' + userid + '/'+ subjectname + '/' + collectionname)
		},
		//Update Subject
		editSubject: function(body){
			return $http.put('/api/vf-os-enabler/subject/update/', JSON.stringify(body))
		},
		//Update Collection
		editCollection: function(body){
			return $http.put('/api/vf-os-enabler/collection/update/', JSON.stringify(body))
		},
		//Update Request
		editRequest: function(body){
			return $http.put('/api/vf-os-enabler/request/update/', JSON.stringify(body))
		},
		//Update RequestCondition
		editRequestCondition: function(body){
			return $http.put('/api/vf-os-enabler/condition/update/', JSON.stringify(body))
		},
		//Update Activity
		editActivity: function(body){
			return $http.put('/api/vf-os-enabler/activity/update/', JSON.stringify(body))
		},
		//Delete Subject by Subject ID
		deleteSubjects: function(subjectid){
			return $http.delete('/api/vf-os-enabler/subject/delete/' + subjectid)
		},
		//Delete Collection by Collection ID
		deleteCollections: function(collectionsid){
			return $http.delete('/api/vf-os-enabler/collection/delete/' + collectionsid)
		},
		//Delete Request by Request ID
		deleteRequest: function(requestID){
			return $http.delete('/api/vf-os-enabler/request/delete/' + requestID)
		},
		//Delete Conditions by RequestConditions ID
		deleteRequestConditions: function(requestConditionsID){
			return $http.delete('/api/vf-os-enabler/condition/delete/' + requestConditionsID)
		},
		//Delete Activity by Activity ID
		deleteActivity: function(activityID){
			return $http.delete('/api/vf-os-enabler/activity/delete/' + activityID)
		},
		//Get All Parameters of Subjects by UserID
		getSubjects: function(userid){
			return $http.get('/api/vf-os-enabler/subject/get/' + userid)
		},
		//Get SubjectsID of Subjects by UserID and Subject Name
		getSubjectsID: function(userid, subjectname){
			return $http.get('/api/vf-os-enabler/subject/getID/' + userid + '/'+ subjectname)
		},
		//Get All Parameters of Collections by by User ID and Subject Name
		getCollections: function(userid, subjectname){
			return $http.get('/api/vf-os-enabler/collection/get/' + userid + '/'+ subjectname)
		},
		//Get SubjectsID of Subjects by User ID, Subject Name and Collection Name
		getCollectionsID: function(userid, subjectname, collectionsname){
			return $http.get('/api/vf-os-enabler/collection/getID/' + userid + '/'+ subjectname + '/' + collectionsname)
		},
		//Get All Parameters of Request by User ID, Subject Name and Collection Name
		getRequest: function(userid, subjectname, collectionsname){
			return $http.get('/api/vf-os-enabler/request/get/' + userid + '/' + subjectname + '/' + collectionsname)
		},
		//Get Name of Request by Request ID
		getRequestNamebyID: function(requestid){
			return $http.get('/api/vf-os-enabler/request/getbyID/' + requestid)
		},
		//Get All Parameters of RequestCondition  by Request ID
		getRequestConditions: function(requestid){
			return $http.get('/api/vf-os-enabler/condition/get/' + requestid)
		},
		//Get All Parameters of Activity by User ID, Subject Name and Collection Name
		getActivity: function(userid, subjectname, collectionsname){
			return $http.get('/api/vf-os-enabler/activity/get/' + userid + '/' + subjectname + '/' + collectionsname)
		},
		//Get All Parameters of Status List by Activity
		getStatusList: function(activityid){
			return $http.get('/api/vf-os-enabler/statuslist/get/' + activityid)
		}
	}
})