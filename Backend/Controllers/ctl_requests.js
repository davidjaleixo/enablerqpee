/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*controller to handle everything about Requests*/

var logger = require('../../Config/logger.js');

//loading the db table handler
var requests = require('../handlers/tables/requests.js');


module.exports = {
	create:function(req,res){
		logger.info("we are on the requests controller - handler create");
		//call db hander
		requests.create(req.body.url, req.body.method, req.body.raw, req.body.payload, req.body.collectionid, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "CollectionsID Incorrect" || r == "Method Incorrect" || r == "Raw Incorrect" || r == "Payload Incorrect, not JSON format"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Create Request: Successfully"}));
				}
			}
			res.end();
		});
	},
	delete:function(req,res){
		logger.info("we are on the requests controller - handler delete");
		requestID = req.params.requestid;
		//call db handler
		requests.delete(requestID, function(e, r){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				if(r == "RequestID Incorrect" || r == "There is no Record"){
					res.writeHead(404, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: r}));
				}else{
					res.writeHead(200, {'Content-type': 'application/json'});
					res.write(JSON.stringify({Result: true, Reason: "Delete Request: Successfully"}));
				}
			}
			res.end();
		})
	},
	update: function(req,res){
		logger.info("we are on the requests controller - handler update");
		//call db handler
		requests.update(req.body.id, req.body.newurl, req.body.newmethod, req.body.newraw, req.body.newpayload, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, Reason: e}));
			}else{
				res.writeHead(200, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: true, Reason: "Update Request: Successfully"}));
			}
			res.end();
		})
	},
	get: function(req,res){
		logger.info("we are on the requests controller - handler get");
		userid = req.params.userid;
		subjectname = req.params.subjectname;
		collectionsname = req.params.collectionsname;
		//call db handler
		requests.getID(userid, subjectname, collectionsname, function(e, result){
			if(e){
				logger.error(e);
				res.writeHead(500, {'Content-type': 'application/json'});
				res.write(JSON.stringify({Result: false, data: e}));
			}else{
				if(result == "UserID Incorrect" || result == "SubjectName and/or CollectionName Incorrect" || result == "There is no Record"){
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
	getbyID: function(req,res){
		logger.info("we are on the requests controller - handler getbyID");
		requestID = req.params.requestid;
		//call db handler
		requests.getbyID(requestID, function(e, result){
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