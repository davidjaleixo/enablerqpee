/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER ACTIVITIES DB*/

var db = require('../db/db.js');
var subject = require('./subjects.js');
var collection = require('./collections.js');
var requests = require('./requests.js');
var execution = require('./executions.js');
var statuslist = require('./statuslist.js');
var logger = require('../../../Config/logger.js');

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

	create : function (count, requestID, cb) {
		requests.getbyID(requestID, function(e, result){
			if(e){
				cb(e)
			}else{
				if(result.length == 0){
					cb(false, "RequestID Incorrect")
				}else{
					if(!isNaN(count) && !Number.isInteger(count) && count <= 0){
						cb(false, "Count is not a number or is negative/float number")
					}else{
						handlerDB("INSERT INTO activity  (count, requestID) VALUES ('"+count+"', '"+requestID+"')", function(e, r){
							logger.info("Creating activity");
							cb(false)
						})
					}
				}
			}
		})
	},
	delete : function (id,cb) {
		handlerDB("SELECT * FROM activity WHERE activityID = '"+id+"'", function(e,r){
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false,"ActivityID Incorrect");
				}else{
					handlerDB("DELETE FROM activity WHERE activityID = '"+id+"'", function(e){
						logger.info("Deleting activity with id", id);
						cb(false)
					})
				}
			}
		})
	},
	update : function (id, newcount , cb) {
		handlerDB("SELECT * FROM activity WHERE activityID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].activityID);
				handlerDB("UPDATE activity SET count = '"+newcount+"' WHERE activityID = '"+r[0].activityID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})	
	},
	get : function (userID, subjectName, collectionsName, cb) {
		var response = [];
		subject.getbyNameUserID(userID, subjectName, function(e, resultSubject){
			if(e){
				cb(true, e)
			}else{
				if(resultSubject.length == 0){
					cb(false,"UserID and/or SubjectName Incorrect")
				}else{
					resultSubject.forEach(function(eachSubject, subjectIndex){ 
						collection.getbyNameSubjectsID(eachSubject.subjectsID, collectionsName, function(e, resultCollection){
							if(e){
								cb(true, e)
							}else{
								if(resultCollection.length == 0){
									cb(false,"CollectionName Incorrect")
								}else{
									resultCollection.forEach(function(eachCollection, collectionIndex){ 
										requests.get(eachCollection.collectionsID, function(e, resultRequest){
											if(e){
												cb(true, e)
											}else{
												resultRequest.forEach(function(eachRequest, requestIndex){
													handlerDB("SELECT * FROM activity WHERE requestID = '"+eachRequest.requestID+"'", function(e,resultActivity){
														logger.info("GET activity with requestID", eachRequest.requestID);
														if(e){
															cb(true, e)
														}else{
															if(resultActivity.length > 0){
																resultActivity.forEach(function(eachActivity, activityIndex){ 
																	execution.getLastElement(eachActivity.activityID, function(e, resultExecution){
																		if(e){
																			cb(true, e)
																		}else{
																			if(resultExecution.length > 0){
																				statuslist.getDescription(resultExecution[0].statusListID, function(e, resultStatuslist){
																					if(e){
																						cb(true, e)
																					}else{
																						response.push({activityID: eachActivity.activityID, requestID: eachRequest.requestID, method: eachRequest.method, count: eachActivity.count, result: resultStatuslist[0].description});
																						if((response.length - 1 == resultActivity.length - 1)){
																							cb(false,response)
																						}
																					}
																				})
																			}else{
																				response.push({activityID: eachActivity.activityID, requestID: eachRequest.requestID, method: eachRequest.method, count: eachActivity.count, result: "Not Apply"});
																				if((response.length - 1 == resultActivity.length - 1)){
																					cb(false,response)
																				}
																			}
																		}
																	})
																})	
															}else{
																cb(false, "There is no Record")
															}					
														}
													})
												})
											}
										})
									})
								}
							}
						})
					})
				}
			}
		})
	},
	getbyRequestID : function (requestID, cb) {
		handlerDB("SELECT * FROM activity WHERE requestID = '"+requestID+"'", function(e,r){
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}