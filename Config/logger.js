/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//logger.js

var winston = require('winston');
var configuration = require('../config.json')

module.exports = mylogger = new (winston.Logger)({
	level: configuration.Logger.DEBUGLEVEL,
	transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'qpeenabler.log' })
    ]
});

