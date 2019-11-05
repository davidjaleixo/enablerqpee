/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Conditions*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var condition = require('../handlers/tables/conditions.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the conditions controller - handler create");
		//call db hander
		condition.create(req.body.description, req.body.keySubject, req.body.keyCondition, req.body.value, req.body.requestID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "RequestID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else if(r == "Value is not a number or is negative/float number" || r == "Condition Incorrect"){
					res.writeHead(400, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Create RequestConditions: Successfully"}));
				}
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the conditions controller - handler delete");
		requestConditionsID = req.params.requestconditionsid
		//call db handler
		condition.delete(requestConditionsID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "RequestConditionsID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "RequestConditionsID Incorrect"}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Delete RequestConditions: Successfully"}));
				}
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the conditions controller - handler update");
		//call db handler
		condition.update(req.body.id, req.body.newdescription, req.body.newkey, req.body.newCondition, req.body.newvalue, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update RequestConditions: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the conditions controller - handler get");
		requestID = req.params.requestid;
		//call db handler
		condition.get(requestID, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "RequestID Incorrect" || result == "There is no Record"){
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