/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/* HANLDER COLLECTIONS DB*/

var db = require('../db/db.js');
var subject = require('./subjects.js');
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

	create : function (name, subjectsID, cb) {
		subject.getbyID(subjectsID, function(e, result){
			if(e){
				cb(e)
			}else{
				if(result.length == 0){
					cb(false, "SubjectsID Incorrect")
				}else{
					handlerDB("SELECT * FROM collections WHERE (name = '"+name+"' and subjectsID = '"+subjectsID+"')", function(e,r){
						if(e){
							cb(e)
						}else{
							if(r.length == 0){
								handlerDB("INSERT INTO collections  (name, subjectsID) VALUES ('"+name+"','"+subjectsID+"')", function(e, r){
									logger.info("Creating collections");
									if(e){cb(e)}else{cb(false, "Success")}
								});
							}else{
								cb(false, "Collections Already Exists in this Subjects")
							}
						}
					})
				}
			}
		})
	},
	delete : function (id,cb) {
		handlerDB("SELECT * FROM collections WHERE collectionsID = '"+id+"'", function(e,r){
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false,"CollectionsID Incorrect");
				}else{
					handlerDB("DELETE FROM collections WHERE collectionsID = '"+id+"'", function(e){
						logger.info("Deleting collections with id", id);
						cb(false)
					})
				}
			}
		})
	},
	update : function (id, newname, cb) {
		handlerDB("SELECT * FROM collections WHERE collectionsID = '"+id+"'", function(e,r){
			if(e){
				cb(true,e)
			}else{
				logger.info("show the internal id:", r[0].collectionsID);
				handlerDB("UPDATE collections SET name = '"+newname+"' WHERE collectionsID = '"+r[0].collectionsID+"'", function(e,r){
					if(e){cb(true, e)}else{cb(false)}
				})
			}
		})	
	},
	get : function (userID, subjectName, cb) {
		handlerDB("SELECT * FROM subjects WHERE (userID = '"+userID+"' and name = '"+subjectName+"')", function(e,r){
			logger.info("GET subjects with userID", userID);
			if(e){
				cb(true, e)
			}else{
				if(r.length == 0){
					cb(false, "UserID and/or SubjectName Incorrect")
				}else{
					r.forEach(function(eachBody, bodyIndex){
						handlerDB("SELECT * FROM collections WHERE subjectsID = '"+eachBody.subjectsID+"'", function(e,result){
							logger.info("GET collections with subjectsID", eachBody.subjectsID);
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
	},
	getID : function (userID, subjectName, collectionName, cb) {
		handlerDB("SELECT * FROM subjects WHERE userID = '"+userID+"'", function(e,r){
			logger.info("GET subjects with userID", userID);
			if(e){
				cb(true, e)
			}else{
				r.forEach(function(eachBody, bodyIndex){
					if(eachBody.name == subjectName){
						handlerDB("SELECT * FROM collections WHERE (subjectsID = '"+eachBody.subjectsID+"' and name = '"+collectionName+"')", function(e,res){
							logger.info("GET collections with subjectsID", eachBody.subjectsID);
							if(e){cb(true, e)}else{cb(false, res[0].collectionsID)}
						})
					}
				})
			}
		})
	},
	getbyNameSubjectsID : function (subjectsID, collectionsName, cb) {
		handlerDB("SELECT * FROM collections WHERE (subjectsID = '"+subjectsID+"' and name = '"+collectionsName+"')", function(e,r){
			logger.info("GET collections with subjectsID", subjectsID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	},
	getbyID : function (collectionsID, cb) {
		handlerDB("SELECT * FROM collections WHERE collectionsID = '"+collectionsID+"'", function(e,r){
			logger.info("GET collections with collectionsID", collectionsID);
			if(e){cb(true, e)}else{cb(false, r)}
		})
	}
}

