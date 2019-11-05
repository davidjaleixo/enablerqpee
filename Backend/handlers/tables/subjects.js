/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER SUBJECTS DB*/

var db = require('../db/db.js');
var user = require('./users.js');
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

	create : function (name, description, userID, cb) {
		user.get(userID, function(e,res){
			if(e){
				cb(true, e)
			}else{
				if(res.length == 0){
					user.create(userID, function(e,res){
						if(e){
							cb(true, e)
						}else{
							handlerDB("INSERT INTO subjects (name, description, userID) VALUES ('"+name+"', '"+description+"', '"+userID+"')", function(e, r){
								logger.info("Creating subjects");
								if(e){cb(e)}else{cb(false)}
							});
						}
					})
				}else{
					handlerDB("SELECT * FROM subjects WHERE (name = '"+name+"' and userID = '"+userID+"')", function(e,result){
						if(e){
							cb(true, e)
						}else{
							if(result.length == 0){
								handlerDB("INSERT INTO subjects (name, description, userID) VALUES ('"+name+"', '"+description+"', '"+userID+"')", function(e, r){
									logger.info("Creating subjects");
									if(e){cb(e)}else{cb(false)}
								});
							}else{
								cb(false, "Subject Name Already Exists")
							}
						}
					})
				}
			}
		})
	},
	delete : function (id,cb) {
		handlerDB("SELECT * FROM subjects WHERE subjectsID = '"+id+"'", function(e,res){
			if(e){
				cb(true, e)
			}else{
				if(res.length == 0){
					cb(false, "SubjectsID Incorrect")
				}else{
					handlerDB("DELETE FROM subjects WHERE subjectsID = '"+id+"'", function(e,r){
						logger.info("Deleting subjects with id", id);
						if(e){cb(true, e)}else{cb(false)}
					})
				}
			}
		})

	},
	update : function (id, newname, newdescription, cb) {
		handlerDB("SELECT * FROM subjects WHERE subjectsID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].subjectsID);
				handlerDB("UPDATE subjects SET name = '"+newname+"', description = '"+newdescription+"' WHERE subjectsID = '"+r[0].subjectsID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})
	},
	get : function (userID, cb) {
		user.get(userID, function(e,res){
			if(e){
				cb(true, e)
			}else{
				if(res.length == 0){
					user.create(userID, function(e,res){
						if(e){
							cb(true, e)
						}else{
							cb(false, "There is no Record")							
						}
					})
				}else{
					handlerDB("SELECT * FROM subjects WHERE userID = '"+userID+"'", function(e,r){
						logger.info("GET subjects with userID", userID);
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
	},
	getID : function (userID, subjectName, cb) {
		handlerDB("SELECT * FROM subjects WHERE userID = '"+userID+"'", function(e,r){
			logger.info("GET subjects with userID", userID);
			if(e){
				cb(true, e)
			}else{
				r.forEach(function(eachBody, bodyIndex){
					if(eachBody.name == subjectName){
						cb(false, eachBody.subjectsID)
					}
				})
			}
		})
	},
	getbyNameUserID : function (userID, subjectName, cb) {
		handlerDB("SELECT * FROM subjects WHERE (userID = '"+userID+"' and name = '"+subjectName+"')", function(e,r){
			logger.info("GET subjects with userID", userID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	},
	getbyID : function (subjectsID, cb) {
		handlerDB("SELECT * FROM subjects WHERE subjectsID = '"+subjectsID+"'", function(e,r){
			logger.info("GET subjects with subjectsID", subjectsID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}

