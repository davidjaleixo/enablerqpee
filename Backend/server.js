/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//server.js

var express        = require('express');
var server         = express();
var bodyParser     = require ('body-parser');
var methodOverride = require('method-override');

//load the db middleware
var db = require('./handlers/db/db.js');

var constants = require('../constants.js');
var configuration = require('../config.json');
var logger = require('../Config/logger.js');

var port = configuration.Enabler.PORT || 3000;

//Server Use
server.use(bodyParser.json());

server.use(bodyParser.json({type: 'application/vnd.api+json'}))

server.use(bodyParser.urlencoded({extended: true}));

server.use(methodOverride('X-HTTP-Method-Override'));

server.use(express.static(constants.FRONTEND_PATH + '/public'));



//Routes
require('./routes')(server);

server.listen(port);
logger.info("QPE Enabler running at port:", port);

//Expose server
exports = module.exports = server