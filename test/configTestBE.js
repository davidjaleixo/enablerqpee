/*made by Thrinisha Mohandas @ KBZ thrinisha.mohandas@knowledgebiz.pt*/

/*
npm install mocha
npm install mochawesome
npm install request --save
npm install chai --save
*/

var request 	= require("request");
var assert 		= require("chai").assert;
var expect		= require("chai").expect;
var constants	= require("../constants.js");
var mysql	    = require('mysql');
var dbconfig    = require('../Config/database');
var base_url 	= 'http://127.0.0.1:3000';

describe("Quality Performance Evaluator Enabler BACKEND", function(){
	describe("API", function(){
		describe("1. Testing Database Connection", function(){
			var dbpool = mysql.createPool(dbconfig);
			it('Should Connect to Database without an error', function (done) {
				dbpool.getConnection(done);
			});
		})
		describe("2. POST " + constants.ROUTES.POST.CREATESUBJECT, function(){
			describe("2.1 Create new subject for an existing userID", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATESUBJECT,
						form:{
							name:"TestSubjectMocha",
							description: "Same Description",
							userID: "Mocha"
						}
					};
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})

				})
				it("DB should have the new subject", function(done){
					request.get(base_url + constants.ROUTES.GET.GETSUBJECT + "Mocha", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].name, "TestSubjectMocha");
						done();
					})
				})
			})
			describe("2.2 Create new subject for an existing userID with same subject name", function(){
				it("should return status code 400", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATESUBJECT,
						form:{
							name:"TestSubjectMocha",
							description: "Same Description - New Test",
							userID: "Mocha"
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 400);
						done();
					})
				})
			})
		})
		describe("3. POST " + constants.ROUTES.POST.CREATECOLLECTION, function(){
			describe("3.1 Create new collection for an existing subjectsID", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATECOLLECTION,
						form:{
							name:"TestCollectionMocha",
							subjectsID: 39
						}
					};
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("DB should have the new collection", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCOLLECTION + "Mocha/TestSubjectMocha", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].name, "TestCollectionMocha");
						done();
					})
				})
			})
			describe("3.2 Create new collection for an existing subjectsID with same collection name", function(){
				it("should return status code 400", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATECOLLECTION,
						form:{
							name:"TestCollectionMocha",
							subjectsID: 39
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 400);
						done();
					})
				})
			})
			describe("3.3 Create new collections with non existing subjectsID", function(){
				it("should return status code 404", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATECOLLECTION,
						form:{
							name:"TestCollection",
							subjectsID: 100
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})

				})
			})
		})
		describe("4. POST " + constants.ROUTES.POST.CREATEREQUEST, function(){
			describe("4.1 Create new request for an existing collectionID", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATEREQUEST,
						form:{
							collectionid:26,
							url:"https://mocha.free.beeceptor.com/my/api/path",
							method:"POST",
							raw:"application/json",
							payload:{"test":"test1"}
						}
					};
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("DB should have the new Request", function(done){
					request.get(base_url + constants.ROUTES.GET.GETREQUEST + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].url, "https://mocha.free.beeceptor.com/my/api/path");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].method, "POST");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].raw, "application/json");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].payload, '{"test":"test1"}');
						done();
					})
				})
			})
			describe("4.2 Create new request with non existing subjectsID", function(){
				it("should return status code 404", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATEREQUEST,
						form:{
							collectionid:100,
							url:"https://mocha.free.beeceptor.com/my/api/path",
							method:"POST",
							raw:"application/json",
							payload:{"test":"test1"}
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
		})
		describe("5. POST " + constants.ROUTES.POST.CREATECONDITION, function(){
			describe("5.1 Create new condition for an existing requestID", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATECONDITION,
						form:{
							description:"TestConditionMocha",
							keySubject:"StatusCode",
							keyCondition: ">",
							value:"100",
							requestID:50
						}
					};
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("DB should have the new Condition", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCONDITION + "50", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].description, "TestConditionMocha");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].keySubject, "StatusCode");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].keyCondition, ">");
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].value, "100");
						done();
					})
				})
			})
			describe("5.2 Create new condition with non existing requestID", function(){
				it("should return status code 404", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATECONDITION,
						form:{
							description:"TestConditionMocha - New Test",
							keySubject:"StatusCode",
							keyCondition: ">",
							value:"100",
							requestID:100
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
		})
		describe("6. POST " + constants.ROUTES.POST.CREATEACTIVITY, function(){
			describe("6.1 Create new activity for an existing requestID", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATEACTIVITY,
						form:{
							count:2,
							requestID:50
						}
					};
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("DB should have the new Activity", function(done){
					request.get(base_url + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].count, 2);
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].requestID, 50);
						done();
					})
				})
			})
			describe("6.2 Create new activity with non existing requestID", function(){
				it("should return status code 404", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATEACTIVITY,
						form:{
							count:2,
							requestID:100
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
		})
		describe("7. POST " + constants.ROUTES.POST.CREATEPERFORMANCE, function(){
			describe("7.1 Create new performance test", function(){
				it("should return status code 200", function(done){
					var post_data = {
						url: base_url + constants.ROUTES.POST.CREATEPERFORMANCE + "Mocha/TestSubjectMocha/TestCollectionMocha",
						form:{
						}
					}
					request.post(post_data, function(error, response, body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("DB should have the new Performance Test", function(done){
					request.get(base_url + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if (error){
							done(error);
							return;
						}
						assert.equal(JSON.parse(body).data[JSON.parse(body).data.length - 1].result, "Success");
						done();
					})
				})
			})
		})
		describe("8. GET " + constants.ROUTES.GET.GETSUBJECT + "Mocha", function(){
			describe("8.1 Query all Subjects for existing userID", function(){
				it("should return status code 200", function(done){
					request.get(base_url +constants.ROUTES.GET.GETSUBJECT + "Mocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETSUBJECT + "Mocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
		describe("9. GET " + constants.ROUTES.GET.GETCOLLECTION + "Mocha/TestSubjectMocha", function(){
			describe("9.1 Query all Collections for non-existing subjectName", function(){
				it("should return status code 404", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCOLLECTION + "Mocha/SubjectNotExisting", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
			describe("9.2 Query all Collections for existing userID and subjectName", function(){
				it("should return status code 200", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCOLLECTION + "Mocha/TestSubjectMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCOLLECTION + "Mocha/TestSubjectMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
		describe("10. GET " + constants.ROUTES.GET.GETREQUEST + "Mocha/TestSubjectMocha/TestCollectionMocha", function(){
			describe("10.1 Query all Requests for non-existing collectionsName", function(){
				it("should return status code 404", function(done){
					request.get(base_url + constants.ROUTES.GET.GETREQUEST + "Mocha/TestSubjectMocha/CollectionNotExisting", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
			describe("10.2 Query all Request for existing userID, subjectName and collectionName", function(){
				it("should return status code 200", function(done){
					request.get(base_url + constants.ROUTES.GET.GETREQUEST + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETREQUEST + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
		describe("11. GET " + constants.ROUTES.GET.GETCONDITION + "50", function(){
			describe("11.1 Query all Conditions for non-existing requestID", function(){
				it("should return status code 404", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCONDITION + "100", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
			describe("11.2 Query all Conditions for existing requestID", function(){
				it("should return status code 200", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCONDITION + "50", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETCONDITION + "50", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
		describe("12. GET " + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/TestCollectionMocha", function(){
			describe("12.1 Query all Activities for non-existing collectionsName", function(){
				it("should return status code 404", function(done){
					request.get(base_url + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/CollectionNotExisting", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
			describe("12.2 Query all Activities for existing userID, subjectName and collectionName", function(){
				it("should return status code 200", function(done){
					request.get(base_url + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETACTIVITY + "Mocha/TestSubjectMocha/TestCollectionMocha", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
		describe("13. GET " + constants.ROUTES.GET.GETSTATUSLIST + "36", function(){
			describe("13.1 Query all StatusList for non-existing activityID", function(){
				it("should return status code 404", function(done){
					request.get(base_url + constants.ROUTES.GET.GETSTATUSLIST + "100", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 404);
						done();
					})
				})
			})
			describe("13.2 Query all StatusList for existing activityID", function(){
				it("should return status code 200", function(done){
					request.get(base_url + constants.ROUTES.GET.GETSTATUSLIST + "36", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						assert.equal(response.statusCode, 200);
						done();
					})
				})
				it("should return response body with Result true", function(done){
					request.get(base_url + constants.ROUTES.GET.GETSTATUSLIST + "36", function(error,response,body){
						if(error){
							done(error);
							return;
						}
						expect(JSON.parse(body)).to.have.property('Result', true);
						assert.equal(JSON.parse(body).Result, true);
						done();
					})
				})
			})
		})
	})
})

