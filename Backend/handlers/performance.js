/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//performance.js

var logger = require('../../Config/logger.js');
var http = require('./httpRequest.js');

//loading the db table handler
var collection = require('./tables/collections.js');
var request = require('./tables/requests.js');
var condition = require('./tables/conditions.js');
var execution = require('./tables/executions.js');
var statuslist = require('./tables/statuslist.js');
var results = require('./tables/results.js');
var activity = require('./tables/activities.js');

//performanceHandler - To Make Performance test
module.exports.performanceHandler = function (req,res) {
	var handler = "backend.controllers.performanceHandler";
	var response = [];
	userID = req.params.userid;
	subjectName = req.params.subjectname;
	collectionName = req.params.collectionsname;
	
	//Get Collections ID
	collection.getID(userID, subjectName, collectionName, function(e, Result){
		//Get all Request by Collections ID
		request.get(Result, function(e, requestResult){
			if(e){
				logger.error(handler,e);
			}else{
				if(requestResult.length > 0){
					requestResult.forEach(function(eachRequest, requestIndex){
					//Get all Activities by Each Request Found
					activity.getbyRequestID(eachRequest.requestID, function(e, activityResult){
						if(e){
							logger.error(handler,e);
						}else{
							if(activityResult.length > 0){
								activityResult.forEach(function(eachActivity, activityIndex){
									logger.info(handler,"Execution Started");
									var start_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
									//Get all Conditions by Each Request Found
									condition.get(eachRequest.requestID, function(e, conditionResult){
										if(e){
											logger.error(handler,e);
										}else{
											if(conditionResult.length > 0){
												conditionResult.forEach(function(eachRequestCondition, requestConditionIndex){
													//Call HTTPRequest function for request:
													//Input:
													//url, method , raw , keySubject , keyCondition , value, payload AND count
													http.sendHttpRequest(eachRequest.url, eachRequest.method, eachRequest.raw, eachRequestCondition.keySubject, eachRequestCondition.keyCondition, eachRequestCondition.value, eachRequest.payload, eachActivity.count, function(result, information){
														if(result){
															response.push({requestID: eachRequest.requestID, requestConditionsID: eachRequestCondition.requestConditionsID, activityID: eachActivity.activityID, Result: "Success"});
															//Call dbHandler function for put in database the results
															dbHandler("Success", information, start_time, eachRequest.requestID, eachRequestCondition.requestConditionsID, eachActivity.activityID);
															if(requestConditionIndex == conditionResult.length - 1 && activityIndex == activityResult.length - 1 && requestIndex == requestResult.length - 1){
																//Call responseBackend function to send response
																responseBackend(res, response);
															}
														}else{
															response.push({requestID: eachRequest.requestID, requestConditionsID: eachRequestCondition.requestConditionsID, activityID: eachActivity.activityID, Result: "Failed"});
															//Call dbHandler function for put in database the results
															dbHandler("Failed", information, start_time, eachRequest.requestID, eachRequestCondition.requestConditionsID, eachActivity.activityID);
															if(requestConditionIndex == conditionResult.length - 1 && activityIndex == activityResult.length - 1 && requestIndex == requestResult.length - 1){
																//Call responseBackend function to send response
																responseBackend(res, response);
															}
														}
													});
												})
											}else{
												//Call responseBackend function to send response
												responseBackend(res, "There is no Request Condition Record");
											}
										}
									});
								})
							}else{
								//Call responseBackend function to send response
								responseBackend(res, "There is no Activity Record");
							}
						}
					})
				})
				}else{
					//Call responseBackend function to send response
					responseBackend(res, "There is no Request Record");
			}
		}
	})
	})
}

//dbHandler - All DB Interaction
//Input:
//Result (Success or Failed), start_time (When Execution Started), requestID, requestConditionsID, activityID
function dbHandler (result, information, start_time, requestID, requestConditionsID, activityID){
	var handler = "backend.controllers.performanceHandler";
	//Insert StatusList on DB
	statuslist.create(result, information, function(e, r){
		if(e){
			logger.error(handler,e);
		}else{
			logger.error(handler,"Insert StatusList Success");
			var end_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
			//Insert Execution on DB
			execution.create(start_time, end_time, requestID, r, activityID, function(e){
				if(e){
					logger.error(handler,e);
				}else{
					logger.info(handler,"Execution Completed");
					//Insert Results on DB
					results.create(r, requestConditionsID, function(e){
						if(e){
							logger.error(handler,e);
						}else{
							logger.info(handler,"Results Created");
						}
					});
				}
			});
		}
	});
}

//responseBackend - Response by Server to Client
//Input:
//res, response (Will be a String or Array)
function responseBackend (res, response){
	var booleanCheck = false;
	if(Array.isArray(response)){
		response.forEach(function(eachResponse, responseIndex){
			if(eachResponse.Result == "Failed"){
				booleanCheck = true;
				if(responseIndex == response.length - 1){
					if(booleanCheck == true){
						//res.writeHead(404, {'Content-type': 'application/json'});
						res.writeHead(200, {'Content-type': 'application/json'});
						res.write(JSON.stringify({Result: true, Reason: response}));
						res.end();
					}else{
						res.writeHead(200, {'Content-type': 'application/json'});
						res.write(JSON.stringify({Result: true, Reason: response}));
						res.end();
					}
				}
			}else{
				if(responseIndex == response.length - 1){
					if(booleanCheck == true){
						//res.writeHead(404, {'Content-type': 'application/json'});
						res.writeHead(200, {'Content-type': 'application/json'});
						res.write(JSON.stringify({Result: true, Reason: response}));
						res.end();
					}else{
						res.writeHead(200, {'Content-type': 'application/json'});
						res.write(JSON.stringify({Result: true, Reason: response}));
						res.end();
					}
				}
			}
		})
	}else{
		//res.writeHead(404, {'Content-type': 'application/json'});
		res.writeHead(200, {'Content-type': 'application/json'});
		res.write(JSON.stringify({Result: true, Reason: response}));
		res.end();
	}

}