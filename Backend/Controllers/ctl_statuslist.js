/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about statuslist*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var statuslist = require('../handlers/tables/statuslist.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the statuslist controller - handler create");
		//call db hander
		statuslist.create(req.body.description, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Create Statuslist: Successfully"}));
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the statuslist controller - handler delete");
		//call db handler
		statuslist.delete(req.body.id, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Delete StatusList: Successfully"}));
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the statuslist controller - handler update");
		//call db handler
		statuslist.update(req.body.id, req.body.newdescription, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update StatusList: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the statuslist controller - handler get");
		activityid = req.params.activityid;
		//call db handler
		statuslist.get(activityid, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "ActivityID Incorrect" || result == "There is no Record"){
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