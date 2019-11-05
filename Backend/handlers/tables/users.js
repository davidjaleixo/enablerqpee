/*made by thrinisha mohandas*/

/* HANLDER USERS DB*/

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

	create : function (id, cb) {
		handlerDB("INSERT INTO users (userID) VALUES ('"+id+"')", function(e, r){
			logger.info("Creating user");
			if(e){cb(e)}else{cb(false)}
		});
	},
	delete : function (id,cb) {
		handlerDB("DELETE FROM users WHERE userID = '"+id+"'", function(e,r){
			logger.info("Deleting user with id", id);
			if(e){cb(true, e)}else{cb(false)}
		})
	},	
	get : function (userID, cb) {
		handlerDB("SELECT * FROM users WHERE userID = '"+userID+"'", function(e,r){
			logger.info("GET users with userID", userID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}

