/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//db.js

var mysql = require('mysql');
var config = require('../../../Config/database.js');


module.exports = {
	pool : mysql.createPool(config)
}