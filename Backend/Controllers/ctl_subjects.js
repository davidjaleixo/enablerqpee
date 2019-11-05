/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about subjects*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var subject = require('../handlers/tables/subjects.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the subjects controller - handler create");
		//call db hander
		subject.create(req.body.name, req.body.description, req.body.userID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "Subject Name Already Exists"){
					res.writeHead(400, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Create Subjects: Successfully"}));
				}
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the subjects controller - handler delete");
		subjectid = req.params.subjectid;
		//call db handler
		subject.delete(subjectid, function(e){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "SubjectsID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Delete Subjects: Successfully"}));
				}
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the subjects controller - handler update");
		//call db handler
		subject.update(req.body.id, req.body.newname, req.body.newdescription, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Subjects: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the subjects controller - handler get");
		userID = req.params.userid;
		//call db handler
		subject.get(userID, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "There is no Record"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, data: result}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, data: result}));
				}
			}
			res.end();
		})
	},
	getID: function(req,res){
		logger.info("we are on the subjects controller - handler getID");
		userid = req.params.userid;
		subjectname = req.params.subjectname;
		//call db handler
		subject.getID(userid, subjectname, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, data: result}));
			}
			res.end();
		})
	}
}