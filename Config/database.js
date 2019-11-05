/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//database.js

var configuration = require('../config.json')

module.exports = {
	host: "mysqlservice",
	user: configuration.Database.DBUSER,
	password: configuration.Database.DBPASSWORD,
	database: configuration.Database.DATABASE,
	connectionLimit : configuration.Database.DBCONLIMIT || 10,
	debug: configuration.Database.DBDEBUG
}