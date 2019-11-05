/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//routes.js

var constants = require('../constants.js');
var ctl_activities = require('./Controllers/ctl_activities.js');
var ctl_collections = require('./Controllers/ctl_collections.js');
var ctl_conditions = require('./Controllers/ctl_conditions.js');
var ctl_executions = require('./Controllers/ctl_executions.js');
var ctl_requests = require('./Controllers/ctl_requests.js');
var ctl_results = require('./Controllers/ctl_results.js');
var ctl_statuslists = require('./Controllers/ctl_statuslist.js');
var ctl_subjects = require('./Controllers/ctl_subjects.js');
var ctl_users = require('./Controllers/ctl_users.js');
var performance = require('./handlers/performance.js');


module.exports = function(server) {

    // Server routes ===========================================================

	//Routes - POST
	server.post('/api/vf-os-enabler/subject/create/', ctl_subjects.create);
	server.post('/api/vf-os-enabler/collection/create/', ctl_collections.create);
	server.post('/api/vf-os-enabler/request/create/', ctl_requests.create);
	server.post('/api/vf-os-enabler/condition/create/', ctl_conditions.create);
	server.post('/api/vf-os-enabler/activity/create/', ctl_activities.create);
	server.post('/api/vf-os-enabler/performance/:userid/:subjectname/:collectionsname', performance.performanceHandler);

	//Routes - PUT
	server.put('/api/vf-os-enabler/subject/update/', ctl_subjects.update);
	server.put('/api/vf-os-enabler/collection/update/', ctl_collections.update);
	server.put('/api/vf-os-enabler/request/update/', ctl_requests.update);
	server.put('/api/vf-os-enabler/condition/update/', ctl_conditions.update);
	server.put('/api/vf-os-enabler/activity/update/', ctl_activities.update);

	//Routes - GET
	server.get('/api/vf-os-enabler/subject/get/:userid', ctl_subjects.get);
	server.get('/api/vf-os-enabler/subject/getID/:userid/:subjectname', ctl_subjects.getID);
	server.get('/api/vf-os-enabler/collection/get/:userid/:subjectname', ctl_collections.get);
	server.get('/api/vf-os-enabler/collection/getID/:userid/:subjectname/:collectionsname', ctl_collections.getID);
	server.get('/api/vf-os-enabler/request/get/:userid/:subjectname/:collectionsname', ctl_requests.get);
	server.get('/api/vf-os-enabler/request/getbyID/:requestid', ctl_requests.getbyID);
	server.get('/api/vf-os-enabler/condition/get/:requestid', ctl_conditions.get);
	server.get('/api/vf-os-enabler/activity/get/:userid/:subjectname/:collectionsname', ctl_activities.get);
	server.get('/api/vf-os-enabler/statuslist/get/:activityid', ctl_statuslists.get);


	//Routes - DELETE
	server.delete('/api/vf-os-enabler/subject/delete/:subjectid', ctl_subjects.delete);
	server.delete('/api/vf-os-enabler/collection/delete/:collectionsid', ctl_collections.delete);
	server.delete('/api/vf-os-enabler/request/delete/:requestid', ctl_requests.delete);
	server.delete('/api/vf-os-enabler/condition/delete/:requestconditionsid', ctl_conditions.delete);
	server.delete('/api/vf-os-enabler/activity/delete/:activityid', ctl_activities.delete);


	server.get('*', function(req, res) {
        res.sendFile('index.html', { root: constants.FRONTEND_PATH + '/public/views/' }); // load our public/index.html file
    });	
}