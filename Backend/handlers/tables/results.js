/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER RESULTS DB*/

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

	create : function (statusListID, requestConditionsID, cb) {
		handlerDB("INSERT INTO results (statusListID, requestConditionsID) VALUES ('"+statusListID+"','"+requestConditionsID+"')", function(e, r){
			logger.info("Creating results");
			if(e){cb(e)}else{cb(false)}
		});
	},
	delete : function (id,cb) {
		handlerDB("DELETE FROM results WHERE resultsID = '"+id+"'", function(e,r){
			logger.info("Deleting results with id", id);
			if(e){cb(true, e)}else{cb(false)}
		})
	},
	get : function (statusListID, cb) {
		handlerDB("SELECT * FROM results WHERE statusListID = '"+statusListID+"'", function(e,r){
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}

