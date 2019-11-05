/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about users*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var User = require('../handlers/tables/users.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the users controller - handler create");
		userid = req.params.userid;
		//call db hander
		User.create(userid, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Create User: Successfully"}));
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the users controller - handler delete");
		//call db handler
		User.delete(req.body.id, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Delete User: Successfully"}));
			}
			res.end();
		})
	}
}