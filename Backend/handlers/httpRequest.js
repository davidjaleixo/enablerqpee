/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

//httpRequest.js

var logger = require('../../Config/logger.js');
var request = require('request');

//sendHttpRequest - To Manage the HTTP Request
//Input:
//url, method, raw, key, condition, value, contentBody, count
//Output:
//true/false
module.exports.sendHttpRequest = function (url, method, raw, key, condition, value, contentBody, count, cb) {
  var handler = "backend.controllers.sendHttpRequest";
  var booleanCheck = true;
  var content = [];
  var res = null;

  var options = {
    url: url,
    method: method,
    headers: {
      "content-length": contentBody.length,
      "content-type": raw
    }
  };
  
  logger.info(handler,JSON.stringify(options));

  for(var i = 0; i < count; i++){
    content.push({options:options});
  }

  content.forEach(function(eachContent, contentIndex){
    if(key == "StatusCode"){
      var req = request(eachContent.options, function (error, response, body) { 
        requestCondition(condition, response.statusCode, value, function(ok){
          if(!ok){
            res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + response.statusCode;
            booleanCheck = false;
          }
          if(contentIndex == content.length - 1){
            if(booleanCheck == false){
              cb(false, res);
            }else{
              res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + response.statusCode;
              cb(true, res);
            }
          }
        })
      });
      req.write(contentBody);
      req.end();
    }else if(key == "BodyLength"){
      var req = request(eachContent.options, function (error, response, body) { 
        requestCondition(condition, body.length, value, function(ok){
          if(!ok){
            res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + body.length;
            booleanCheck = false;
          }
          if(contentIndex == content.length - 1){
            if(booleanCheck == false){
              cb(false, res);
            }else{
              res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + body.length;
              cb(true, res);
            }
          }
        })
      });
      req.write(contentBody);
      req.end();
    }else if(key == "TimeResponse"){
      var start = new Date();
      var req = request(eachContent.options, function (error, response, body) { 
        response.responseTime = new Date() - start;
        requestCondition(condition, response.responseTime, value, function(ok){
          if(!ok){
            res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + response.responseTime;
            booleanCheck = false;
          }
          if(contentIndex == content.length - 1){
            if(booleanCheck == false){
              cb(false, res);
            }else{
              res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + response.responseTime;
              cb(true, res);
            }
          }
        })
      });
      req.write(contentBody);
      req.end();
    }else{
      var req = request(eachContent.options, function (error, response, body) { 
        requestCondition(condition, body[key], value, function(ok){
          if(!ok){
            res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + body[key];
            booleanCheck = false;
          }
          if(contentIndex == content.length - 1){
            if(booleanCheck == false){
              cb(false, res);
            }else{
              res = "Expect: " + key + " " + condition +" "+ value + " Actual: " + body[key];
              cb(true, res);
            }
          }
        })
      });
      req.write(contentBody);
      req.end();
    }
  })
}

//requestCondition - Function to deal with condition
//Input:
//condition, responseValue (Request Response Value), value(User Request condition value)
//Output:
//true/false
function requestCondition (condition, responseValue, value, cb){
  switch (condition){
    case ">":
    if(responseValue > value) {
      cb(true)
    }else{
      cb(false)
    }break;
    case "<":
    if(responseValue < value) {
      cb(true)
    }else{
      cb(false)
    }break;
    case ">=":
    if(responseValue >= value) {
      cb(true)
    }else{
      cb(false)
    }break;
    case "<=":
    if(responseValue <= value) {
      cb(true)
    }else{
      cb(false)
    }break;
    case "==":
    if(responseValue == value) {
      cb(true)
    }else{
      cb(false)
    }break;
    default:
  }
}