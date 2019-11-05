/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//Frontend Routes

console.log("Defining feRoutes");
angular.module('feRoutes', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
        // home page with the userid as route parameter
        .when('/:userid', {
        	templateUrl: 'views/user.html',
        	controller: 'userCtrl'
        })
        .when('/:userid/:subjectname', {
        	templateUrl: 'views/subjects.html',
        	controller: 'subjectsCtrl'
        })
        .when('/:userid/:subjectname/:collectionname', {
            templateUrl: 'views/collection.html',
            controller: 'collectionCtrl'
        })
        .when('/:userid/:subjectname/:collectionname/:requestid/conditions', {
            templateUrl: 'views/request.html',
            controller: 'requestCtrl'
        })
        .when('/:userid/:subjectname/:collectionname/run', {
            templateUrl: 'views/run.html',
            controller: 'runCtrl'
        })
        .when('/:userid/:subjectname/:collectionname/:activityid/history', {
            templateUrl: 'views/history.html',
            controller: 'historyCtrl'
        });

        $locationProvider.html5Mode(true);

    }])