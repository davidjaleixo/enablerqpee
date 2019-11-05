/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Results*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var result = require('../handlers/tables/results.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the results controller - handler create");
		//call db hander
		result.create(req.body.statusListID, req.body.requestConditionsID, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Create Results: Successfully"}));
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the results controller - handler delete");
		//call db handler
		result.delete(req.body.id, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Delete Results: Successfully"}));
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the results controller - handler update");
		//call db handler
		result.update(req.body.newstatusListID, req.body.newrequestConditionsID, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Results: Successfully"}));
			}
			res.end();
		})
	}
}