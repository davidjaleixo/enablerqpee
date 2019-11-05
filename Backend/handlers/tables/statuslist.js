/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER STATUSLIST DB*/

var db = require('../db/db.js');
var execution = require('./executions.js');
var results = require('./results.js');
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

	create : function (description, information, cb) {
		handlerDB("INSERT INTO statusList (description, information) VALUES ('"+description+"','"+information+"')", function(e, r){
			logger.info("Creating statusList");
			if(e){
				cb(e)
			}else{
				cb(false, r.insertId)
			}
		});
	},
	delete : function (id,cb) {
		handlerDB("DELETE FROM statusList WHERE statusListID = '"+id+"'", function(e,r){
			logger.info("Deleting statusList with id", id);
			if(e){cb(true, e)}else{cb(false)}
		})
	},
	update : function (id, newdescription, cb) {
		handlerDB("SELECT * FROM statusList WHERE statusListID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].statusListID);
				handlerDB("UPDATE statusList SET description = '"+newdescription+"' WHERE statusListID = '"+r[0].statusListID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})
	},
	get : function (activityID, cb) {
		var response = [];
		var total = 0;
		var success = 0;
		var failed = 0;
		handlerDB("SELECT * FROM activity WHERE activityID = '"+activityID+"'", function(e,resultActivity){
			if(e){
				cb(true, e)
			}else{
				if(resultActivity.length == 0){
					cb(false,"ActivityID Incorrect")
				}else{
					execution.get(activityID, function(e, r){
						if(e){
							cb(true, e)
						}else{
							if(r.length == 0){
								cb(false, "There is no Record")
							}else{
								total = r.length;
								r.forEach(function(eachExecution, executionIndex){
									handlerDB("SELECT * FROM statusList WHERE statusListID = '"+eachExecution.statusListID+"'", function(e,res){
										logger.info("GET statusList with statusListID", eachExecution.statusListID);
										if(e){
											cb(true, e)
										}else{
											res.forEach(function(eachStatusList, statuslistIndex){
												if(eachStatusList.description == "Success"){
													success++;
												}else{
													failed++;
												}
												results.get(eachExecution.statusListID, function(e, result){
													if(e){
														cb(true, e)
													}else{
														result.forEach(function(eachResults, resultsIndex){
															response.push({statusListID: eachExecution.statusListID, date: eachResults.timestamp, description: eachStatusList.description, information: eachStatusList.information});
															if(response.length == r.length){
																percentage = ((parseInt(success) * 100 ) /  parseInt(total)).toFixed(2);
																response.push({Total: total, Success: success, Failed: failed, Percentage: percentage});
																cb(false,response)
															}
														})
													}
												})
											})
										}
									})
								})
							}
						}
					})
				}
			}
		})
	},
	getDescription : function (statusListID, cb) {
		handlerDB("SELECT * FROM statusList WHERE statusListID = '"+statusListID+"'", function(e,r){
			logger.info("GET statusList with statusListID", statusListID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}

