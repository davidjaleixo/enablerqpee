/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Collections*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var collection = require('../handlers/tables/collections.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the collections controller - handler create");
		//call db hander
		collection.create(req.body.name, req.body.subjectsID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "SubjectsID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else if(r == "Collections Already Exists in this Subjects"){
					res.writeHead(400, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Create Collections: Successfully"}));
				}
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the collections controller - handler delete");
		collectionsID = req.params.collectionsid;
		//call db handler
		collection.delete(collectionsID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "CollectionsID Incorrect"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Delete Collections: Successfully"}));
				}
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the collections controller - handler update");
		//call db handler
		collection.update(req.body.id, req.body.newname, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Collections: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the collections controller - handler get");
		userid = req.params.userid;
		subjectname = req.params.subjectname;
		//call db handler
		collection.get(userid, subjectname, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "UserID and/or SubjectName Incorrect" || result == "There is no Record"){
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
		logger.info("we are on the collections controller - handler getID");
		userid = req.params.userid;
		subjectname = req.params.subjectname;
		collectionsname = req.params.collectionsname;
		//call db handler
		collection.getID(userid, subjectname, collectionsname, function(e, result){
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