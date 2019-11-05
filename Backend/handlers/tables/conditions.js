/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER CONDITIONS DB*/

var db = require('../db/db.js');
var requests = require('./requests.js');
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

	create : function (description, key, condition, value, requestID, cb) {
		requests.getbyID(requestID, function(e, result){
			if(e){
				cb(e)
			}else{
				if(result.length == 0){
					cb(false, "RequestID Incorrect")
				}else{
					if(condition != "==" && condition != ">" && condition != ">=" && condition != "<=" && condition != "<="){
						cb(false, "Condition Incorrect")
					}else if((key == "StatusCode" || key == "BodyLength" || key == "TimeResponse") && (!isNaN(value) && !Number.isInteger(value) && value < 0)){
						cb(false, "Value is not a number or is negative/float number")
					}else{
						handlerDB("INSERT INTO requestConditions (description, keySubject, keyCondition, value, requestID) VALUES ('"+description+"','"+key+"','"+condition+"','"+value+"','"+requestID+"')", function(e, r){
							logger.info("Creating requestConditions");
							cb(false)
						})
					}
				}
			}
		})
	},
	delete : function (id,cb) {
		handlerDB("SELECT * FROM requestConditions WHERE requestConditionsID = '"+id+"'", function(e,r){
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false,"RequestConditionsID Incorrect");
				}else{
					handlerDB("DELETE FROM requestConditions WHERE requestConditionsID = '"+id+"'", function(e){
						logger.info("Deleting requestConditions with id", id);
						cb(false)
					})
				}
			}
		})
	},
	update : function (id, newdescription, newkey, newCondition, newvalue, cb) {
		handlerDB("SELECT * FROM requestConditions WHERE requestConditionsID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].requestConditionsID);
				handlerDB("UPDATE requestConditions SET description = '"+newdescription+"', keySubject = '"+newkey+"', keyCondition = '"+newCondition+"', value = '"+newvalue+"' WHERE requestConditionsID = '"+r[0].requestConditionsID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})	
	},
	get : function (requestID, cb) {
		requests.getbyID(requestID, function(e, result){
			if(e){
				cb(true, e)
			}else{
				if(result.length == 0){
					cb(false, "RequestID Incorrect")
				}else{
					handlerDB("SELECT * FROM requestConditions WHERE requestID = '"+requestID+"'", function(e,r){
						logger.info("GET requestConditions with requestID", requestID);
						if(e){
							cb(true, e)
						}else{
							if(r.length == 0){
								cb(false, "There is no Record")
							}else{
								cb(false, r)
							}
						}
					})
				}
			}
		})
	}
}

