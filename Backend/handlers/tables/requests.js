/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER USERS DB*/

var db = require('../db/db.js');
var collection = require('./collections.js');
var logger = require('../../../Config/logger.js');
var isJSON = require('is-json');

var handlerDB = function (q,cb) {
	db.pool.getConnection(function(err, conn){
		if(err){
			logger.error("handlerDB",err);
			cb(true, err);
		}
		logger.info("handlerDB","connected as id ", conn.threadId);
		conn.query(q,function(err, rows){
			conn.release();
			if(!err){
				cb(false, rows)
			}else{
				cb(err)
			}
		})
		conn.on('error', function(err){
			logger.error("handlerDB","error on database connection");
		})
	})
}


/* CRUD */

module.exports = {

	create : function (url, method, raw, payload, collectionid, cb) {
		collection.getbyID(collectionid, function(e, result){
			if(e){
				cb(e)
			}else{
				if(result.length == 0){
					cb(false, "CollectionsID Incorrect")
				}else{
					if(method != "POST" && method != "GET" && method != "PUT" && method != "PATCH" && method != "DELETE"){
						cb(false, "Method Incorrect")
					}else if(raw != "text/xml" && raw != "application/xml" && raw != "application/javascript" && raw != "text/plain" && raw != "application/json"){
						cb(false, "Raw Incorrect")
					}else if(raw == "application/json" && isJSON(JSON.stringify(payload)) == false){
						cb(false, "Payload Incorrect, not JSON format")
					}else{
						if(raw == "application/json"){
							handlerDB("INSERT INTO request (url, method, raw, payload, collectionsID) VALUES ('"+url+"','"+method+"','"+raw+"','"+JSON.stringify(payload)+"','"+collectionid+"')", function(e, r){
								logger.info("Creating Requests");
								cb(false)
							})
						}else{
							handlerDB("INSERT INTO request (url, method, raw, payload, collectionsID) VALUES ('"+url+"','"+method+"','"+raw+"','"+payload+"','"+collectionid+"')", function(e, r){
								logger.info("Creating Requests");
								cb(false)
							})
						}

					}
				}
			}
		})
	},
	delete : function (id,cb) {
		handlerDB("SELECT * FROM request WHERE requestID = '"+id+"'", function(e,r){
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false,"RequestID Incorrect");
				}else{
					handlerDB("DELETE FROM request WHERE requestID = '"+id+"'", function(e){
						logger.info("Deleting Requests with id", id);
						cb(false)
					})
				}
			}
		})
	},
	update : function (id, newurl, newmethod, newraw, newpayload, cb) {
		handlerDB("SELECT * FROM request WHERE requestID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].requestID);
				if(newraw == "application/json"){
					handlerDB("UPDATE request SET url = '"+newurl+"', method = '"+newmethod+"', raw = '"+newraw+"', payload = '"+JSON.stringify(newpayload)+"' WHERE requestID = '"+r[0].requestID+"'", function(e,r){
						if(e){cb(true, e)}else{cb(false)}
					})
				}else{
					handlerDB("UPDATE request SET url = '"+newurl+"', method = '"+newmethod+"', raw = '"+newraw+"', payload = '"+newpayload+"' WHERE requestID = '"+r[0].requestID+"'", function(e,r){
						if(e){cb(true, e)}else{cb(false)}
					})
				}
			}
		})
	},
	get : function (collectionsID, cb) {
		handlerDB("SELECT * FROM request WHERE collectionsID = '"+collectionsID+"'", function(e,r){
			logger.info("GET request with collectionsID", collectionsID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	},
	getID : function (userID, subjectName, collectionsName, cb) {
		handlerDB("SELECT * FROM subjects WHERE userID = '"+userID+"'", function(e,r){
			logger.info("GET subjects with userID", userID);
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false, "UserID Incorrect")
				}else{
					r.forEach(function(eachBody, bodyIndex){
						if(eachBody.name == subjectName){
							handlerDB("SELECT * FROM collections WHERE (subjectsID = '"+eachBody.subjectsID+"' and name = '"+collectionsName+"')", function(e,res){
								logger.info("GET collections with subjectsID", eachBody.subjectsID);
								if(e){
									cb(true, e)
								}else{
									if(res.length == 0){
										cb(false, "SubjectName and/or CollectionName Incorrect")
									}else{
										res.forEach(function(eachBodyCollections, bodyIndex){
											handlerDB("SELECT * FROM request WHERE collectionsID = '"+eachBodyCollections.collectionsID+"'", function(e,result){
												logger.info("GET request with collectionsID", eachBodyCollections.collectionsID);
												if(e){
													cb(true, e)
												}else{
													if(result.length == 0){
														cb(false, "There is no Record")
													}else{
														cb(false, result)
													}
												}
											})
										})
									}
								}
							})
						}
					})
				}
			}
		})
	},
	getbyID : function (requestID, cb) {
		handlerDB("SELECT * FROM request WHERE requestID = '"+requestID+"'", function(e,r){
			logger.info("GET request with requestID", requestID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}
