/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Executions*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var execution = require('../handlers/tables/executions.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the executions controller - handler create");
		//call db hander
		execution.create(req.body.executionTime, req.body.executionAt, req.body.requestID, req.body.statusListID, req.body.activityID, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Create Execution: Successfully"}));
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the executions controller - handler delete");
		//call db handler
		execution.delete(req.body.id, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Delete Execution: Successfully"}));
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the executions controller - handler update");
		//call db handler
		execution.update(req.body.id, req.body.newexecutionTime, req.body.newexecutionAt, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Execution: Successfully"}));
			}
			res.end();
		})
	}
}