/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//constants.js

'use strict';

var path = require('path');
module.exports.FRONTEND_PATH = path.normalize(__dirname + '/Frontend');

//testing paths
module.exports.ROUTES = {
	POST:{
		CREATESUBJECT	    : "/api/vf-os-enabler/subject/create/",
		CREATECOLLECTION	: "/api/vf-os-enabler/collection/create/",
		CREATEREQUEST	    : "/api/vf-os-enabler/request/create/",
		CREATECONDITION	    : "/api/vf-os-enabler/condition/create/",
		CREATEACTIVITY	    : "/api/vf-os-enabler/activity/create/",
		CREATEPERFORMANCE	: "/api/vf-os-enabler/performance/"
	},
	
	GET: {
		GETSUBJECT 		    : "/api/vf-os-enabler/subject/get/",
		GETCOLLECTION 		: "/api/vf-os-enabler/collection/get/",
		GETREQUEST 	        : "/api/vf-os-enabler/request/get/",
		GETCONDITION    	: "/api/vf-os-enabler/condition/get/",
		GETACTIVITY    	    : "/api/vf-os-enabler/activity/get/",
		GETSTATUSLIST    	: "/api/vf-os-enabler/statuslist/get/"
	}
}