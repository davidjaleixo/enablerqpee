/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER EXECUTION DB*/

var db = require('../db/db.js');
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

	create : function (executionTime, executionAt, requestID, statusListID, activityID, cb) {
		handlerDB("INSERT INTO execution (executionTime, executionAt, requestID, statusListID, activityID) VALUES ('"+executionTime+"','"+executionAt+"','"+requestID+"','"+statusListID+"','"+activityID+"')", function(e, r){
			logger.info("Creating execution");
			if(e){cb(e)}else{cb(false)}
		});
	},
	delete : function (id,cb) {
		handlerDB("DELETE FROM execution WHERE executionID = '"+id+"'", function(e,r){
			logger.info("Deleting execution with id", id);
			if(e){cb(true, e)}else{cb(false)}
		})
	},
	update : function (id, newexecutionTime, newexecutionAt, cb) {
		handlerDB("SELECT * FROM execution WHERE executionID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].executionID);
				handlerDB("UPDATE execution SET executionTime = '"+newexecutionTime+"', description = '"+newexecutionAt+"' WHERE executionID = '"+r[0].executionID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})
	},
	get : function (activityID, cb) {
		handlerDB("SELECT * FROM execution WHERE activityID = '"+activityID+"'", function(e,r){
			logger.info("GET execution with activityID", activityID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	},
	getLastElement : function (activityID, cb) {
		handlerDB("SELECT * FROM execution WHERE activityID = '"+activityID+"' ORDER BY executionID DESC LIMIT 1", function(e,r){
			logger.info("GET execution with activityID", activityID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}