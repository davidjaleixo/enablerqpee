/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Activities*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var activity = require('../handlers/tables/activities.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the activities controller - handler create");
		//call db hander
		activity.create(req.body.count, req.body.requestID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "RequestID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else if(r == "Count is not a number or is negative/float number"){
					res.writeHead(400, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Create Activity: Successfully"}));
				}
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the activities controller - handler delete");
		activityID = req.params.activityid;
		//call db handler
		activity.delete(activityID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "ActivityID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "ActivityID Incorrect"}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Delete Activity: Successfully"}));
				}
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the activities controller - handler update");
		//call db handler
		activity.update(req.body.id, req.body.newcount, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Activity: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the activities controller - handler get");
		userid = req.params.userid;
		subjectname = req.params.subjectname;
		collectionsname = req.params.collectionsname;
		//call db handler
		activity.get(userid, subjectname, collectionsname, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "UserID and/or SubjectName Incorrect" || result == "CollectionName Incorrect" || result == "There is no Record"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, data: result}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, data: result}));
				}
			}
			res.end();
		})
	}
}