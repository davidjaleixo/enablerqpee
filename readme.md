## Quality Perfomance Evaluator Enabler
### Read me

#### 1. Prerequisite

In order to run this enabler code on your local machine you should have installed Docker.

#### 2. Instalation

Make sure the docker is installed on the system environment. 

##### 2.1. Clone the code repository:

`git clone https://<username>@opensourceprojects.eu/git/p/vfos/assets/enablers/qpee/code vfos-assets-enablers-qpee-code`

##### 2.2. Run multi-container Docker application

`This multi-container Docker application is composed by two services: `enabler` and `MySQL`.`

`Navigate to the clone directory and execute `docker-compose up --build` to startup the multi-container enabler on background.`

#### 2.3. Configuration JSON File

Quality Perfomance Evaluator Enabler will need the following Variables on JSON File:
`{
    "Database":{
        "DBUSER": "rootUser_db",
        "DBPASSWORD": "rootPassword_db",
        "DATABASE": "name_db",
        "DBCONLIMIT": connectionLimit_db,
        "DBDEBUG": "debug_db"
    },
    "Logger":{
        "DEBUGLEVEL": "level_debug"
    },
    "Enabler":{
        "PORT": port,
    }
}`

`This Variables will be in config.json, locate on the clone directory.`

#### 3. Usage

It´s necessary create a folder named `dbdata` on the clone directory.

Whenever it's needed to have this enabler runnig, please execute `docker-compose up`.

Using your favorite web browser please navigate to `localhost:3919` to reach the frontend module.
Please note that `<localhost>` it's related to the Docker environment which you are using.

The following Frontend endpoints are now available:
`localhost:3919/:userid`
`localhost:3919/:userid/:subjectname`
`localhost:3919/:userid/:subjectname/:collectionname`
`localhost:3919/:userid/:subjectname/:collectionname/:requestid/conditions`
`localhost:3919/:userid/:subjectname/:collectionname/run`
`localhost:3919/:userid/:subjectname/:collectionname/:activityid/history`

For tests purposes `<userid>` could be any wanted String but only for the first endpoint.


#### 4. API

When `Create Subject` or `Get Subject` the enabler will create the user automatically.


## vf-OS Enablers

### Enabler 3 - Create Subject

```http
POST /api/vf-os-enabler/subject/create/
Accept: */*
Content-Type: application/json; charset=utf-8

{
    "name":"my_name",
    "description":"my_description",
    "userID":"my_userID"
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": Create Subjects: Successfully

}
```

Use this API call whenever is needed to create a new subject.

#### Request
`POST /api/vf-os-enabler/subject/create/`

#### JSON Body Payload

Name            | Required    | Type   | Description
--------------- | ----------- | ------ | -----------  
name            |    Yes      | STRING | String where is the name.
description     |    Yes      | STRING | String where is the description.  
userID          |    Yes      | STRING | String for User ID.  

Example of JSON body payload structure: 
`   {
    "name":"Test",
    "description":"This is the description",
    "userID":"Thrinisha"
}`

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": "Create Subjects: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Create Subjects: Successfully.
400  | Subject Name Already Exists.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Create Collections

```http
POST /api/vf-os-enabler/collection/create/
Accept: */*
Content-Type: application/json; charset=utf-8

{
    "name":"my_name",
    "subjectsID":"my_subjectsID"
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": Create Collections: Successfully

}
```

Use this API call whenever is needed to create a new collection.

#### Request
`POST /api/vf-os-enabler/collection/create/`

#### JSON Body Payload

Name            | Required    | Type   | Description
--------------- | ----------- | ------ | -----------  
name            |    Yes      | STRING | String where is the name.
subjectsID      |    Yes      | INT    | Integer for Subjects ID.  

Example of JSON body payload structure: 
`   {
    "name":"Test",
    "subjectsID":"1"
}`

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": "Create Collections: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Create Collections: Successfully.
400  | Collections Already Exists in this Subjects.
404  | SubjectsID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Create Request

```http
POST /api/vf-os-enabler/request/create/
Accept: */*
Content-Type: application/json; charset=utf-8

{
    "collectionid":"my_collectionsID",
    "url":"my_url",
    "method":"my_method",
    "raw":"my_raw",
    "payload":"my_payload"
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": Create Request: Successfully

}
```

Use this API call whenever is needed to create a new request.

#### Request
`POST /api/vf-os-enabler/request/create/`

#### JSON Body Payload

Name             | Required    | Type   | Description
---------------- | ----------- | ------ | -----------  
collectionid     |    Yes      | INT    | Integer for collections ID. 
url              |    Yes      | STRING | String where is the full url. 
method           |    Yes      | STRING | String where is the method, can be: POST, GET, PUT, PATCH and DELETE. 
raw              |    Yes      | STRING | String where is the raw, can be: application/json, text/plain, application/javascript, application/xml and text/xml. 
payload          |    Yes      | STRING | String for the body content (payload). 

Example of JSON body payload structure: 
`  {
    "collectionid":1,
    "url":"http://my_test.com/my/api/path",
    "method":"POST",
    "raw":"application/json",
    "payload":{"test":"test1"}
}`

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": "Create Request: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Create Request: Successfully.
404  | CollectionsID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Create Conditions

```http
POST /api/vf-os-enabler/condition/create/
Accept: */*
Content-Type: application/json; charset=utf-8

{
    "description":"my_description",
    "keySubject":"my_keySubject",
    "keyCondition": "my_condition",
    "value": "my_value",
    "requestID":"my_requestID"
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": Create RequestConditions: Successfully

}
```

Use this API call whenever is needed to create a new request conditions.

#### Request
`POST /api/vf-os-enabler/condition/create/`

#### JSON Body Payload

Name             | Required    | Type   | Description
---------------- | ----------- | ------ | -----------  
description      |    Yes      | STRING | String where is the description.
keySubject       |    Yes      | STRING | String where is the keySubject, can be: StatusCode, BodyLength, TimeResponse and custom key.
keyCondition     |    Yes      | STRING | String where is the keyCondition, can be: ==, >, >=, < and <=.
value            |    Yes      | STRING | String where is the value. 
requestID        |    Yes      | INT    | Integer for request ID. 

Example of JSON body payload structure: 
`  {
    "description":"AnotherTest",
    "keySubject":"StatusCode",
    "keyCondition": ">",
    "value":"200",
    "requestID":"1"
}`

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": "Create RequestConditions: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Create RequestConditions: Successfully.
404  | RequestID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Create Activity

```http
POST /api/vf-os-enabler/activity/create/
Accept: */*
Content-Type: application/json; charset=utf-8

{
    "count":"my_count",
    "requestID":"my_requestID"
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": Create Activity: Successfully

}
```

Use this API call whenever is needed to create a new activity.

#### Request
`POST /api/vf-os-enabler/activity/create/`

#### JSON Body Payload

Name            | Required    | Type   | Description
--------------- | ----------- | ------ | -------------------------  
count           |    Yes      | INT    | Integer for count.
requestID       |    Yes      | INT    | Integer for Request ID. 

Example of JSON body payload structure: 
`   {
    "count":"123",
    "requestID":"1"
}`

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": "Create Activity: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Create Activity: Successfully.
404  | RequestID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Create Performance Test

```http
POST /api/vf-os-enabler/performance/Thrinisha/Subject/NameofCollections
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": [
        {
            "requestID": requestID,
            "requestConditionsID": requestConditionsID,
            "activityID": activityID,
            "Result": "Success"
        }
    ]
}
```

Use this API call whenever is needed to run performance test.

#### Request
`POST /api/vf-os-enabler/performance/:userid/:subjectname/:collectionsname`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
userid             | Identifies the User by ID.
subjectname        | Identifies the Subject by Name.
collectionsname    | Identifies the Collections by Name.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

Example:

```json
{
    "Result": true,
    "Reason": [
        {
            "requestID": 1,
            "requestConditionsID": 1,
            "activityID": 1,
            "Result": "Success"
        }
    ]
}
```

#### Return Codes
Code | Description
---- | ----
200  | Performance test run successfully.
404  | There is no Request Condition Record or There is no Activity Record or There is no Request Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get Subject

```http
GET /api/vf-os-enabler/subject/get/Thrinisha
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "subjectsID": subjectsID,
            "name": "Name",
            "description": "Description",
            "userID": "UserID"
        }
    ]
}
```

Use this API call whenever is needed to retrieve all subjects related to User.  

#### Request
`GET /api/vf-os-enabler/subject/get/:userid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
userid             | Identifies the User by ID.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all statistics related to specific userID:


```json
{
    "Result": true,
    "data": [
        {
            "subjectsID": 1,
            "name": "Test1",
            "description": "New Test",
            "userID": "Thrinisha"
        },
        {
            "subjectsID": 2,
            "name": "Test2",
            "description": "Test",
            "userID": "Thrinisha"
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get Collections

```http
GET /api/vf-os-enabler/collection/get/Thrinisha/Subject
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "collectionsID": collectionsID,
            "name": "name",
            "subjectsID": subjectsID
        }
    ]
}
```

Use this API call whenever is needed to retrieve all collections related to Subject.  

#### Request
`GET /api/vf-os-enabler/collection/get/:userid/:subjectname`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
userid             | Identifies the User by ID.
subjectname        | Identifies the Subject by Name.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all statistics related to specific userID and subjectName:


```json
{
    "Result": true,
    "data": [
        {
            "collectionsID": 1,
            "name": "Test1",
            "subjectsID": 1
        },
        {
            "collectionsID": 4,
            "name": "Test2",
            "subjectsID": 1
        },
        {
            "collectionsID": 6,
            "name": "Test3",
            "subjectsID": 1
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | UserID and/or SubjectName Incorrect or There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get Request

```http
GET /api/vf-os-enabler/request/get/Thrinisha/Subject/Test1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "requestID": requestID,
            "url": "url",
            "method": "method",
            "raw": "raw",
            "payload": "payload",
            "collectionsID": "collectionsID"
        }
    ]
}
```

Use this API call whenever is needed to retrieve all requests related to User, Subject and Collection.  

#### Request
`GET /api/vf-os-enabler/request/get/:userid/:subjectname/:collectionsname`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
userid             | Identifies the User by ID.
subjectname        | Identifies the Subject by Name.
collectionsname    | Identifies the Collection by Name.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all statistics related to specific userID, subjectName and collectionName:


```json
{
    "Result": true,
    "data": [
        {
            "requestID": 1,
            "url": "http://teste.proxy.beeceptor.com/my/api/path",
            "method": "POST",
            "raw": "application/json",
            "payload": "{\"test\":\"test\"}",
            "collectionsID": 1
        },
        {
            "requestID": 2,
            "url": "http://my_test.com/my/api/path",
            "method": "POST",
            "raw": "application/json",
            "payload": "{\"test5\":2}",
            "collectionsID": 1
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | SubjectName and/or CollectionName Incorrect or There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get Conditions

```http
GET /api/vf-os-enabler/condition/get/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "requestConditionsID": requestConditionsID,
            "description": "description",
            "keySubject": "keySubject",
            "keyCondition": "keyCondition",
            "value": "value",
            "requestID": requestID
        }
    ]
}
```

Use this API call whenever is needed to retrieve all requestconditions related to Request.  

#### Request
`GET /api/vf-os-enabler/condition/get/:requestid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
requestid          | Identifies the Request by ID.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all request condition related to specific requestID:


```json
{
    "Result": true,
    "data": [
        {
            "requestConditionsID": 2,
            "description": "code",
            "keySubject": "StatusCode",
            "keyCondition": "==",
            "value": "200",
            "requestID": 1
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | RequestID Incorrect or There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get Activity

```http
GET /api/vf-os-enabler/activity/get/Thrinisha/Subject/Test1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "activityID": activityID,
            "requestID": activityID,
            "method": "method",
            "count": count,
            "result": "Success"
        }
}
```

Use this API call whenever is needed to retrieve all activity related to User, Subject and Collection.  

#### Request
`GET /api/vf-os-enabler/activity/get/:userid/:subjectname/:collectionsname`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
userid             | Identifies the User by ID.
subjectname        | Identifies the Subject by Name.
collectionsname    | Identifies the Collection by Name.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all activity related to specific userID, subjectName and collectionName:


```json
{
    "Result": true,
    "data": [
        {
            "activityID": 3,
            "requestID": 1,
            "method": "POST",
            "count": 3,
            "result": "Success"
        },
        {
            "activityID": 6,
            "requestID": 1,
            "method": "POST",
            "count": 3,
            "result": "Failed"
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | CollectionName Incorrect or UserID and/or SubjectName Incorrect or There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Get StatusList

```http
GET /api/vf-os-enabler/statuslist/get/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "data": [
        {
            "statusListID": 178,
            "date": "2018-08-24T16:22:09.000Z",
            "description": "Success",
            "information": "Expect: StatusCode == 200 Actual: 200"
        },
        {
            "statusListID": 188,
            "date": "2018-08-27T12:24:15.000Z",
            "description": "Success",
            "information": "Expect: BodyLength >= 10 Actual: 17"
        },
        {
            "Total": 2,
            "Success": 2,
            "Failed": 0,
            "Percentage": "100.00"
        }
    ]
}
```

Use this API call whenever is needed to retrieve all statuslist related to Activity.  

#### Request
`GET /api/vf-os-enabler/statuslist/get/:activityid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
activityid          | Identifies the Activity by ID.


#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `data` with the subjects of user (if found).

In the following Example it's queried all statuslist related to specific activityID:


```json
{
    "Result": true,
    "data": [
        {
            "statusListID": 178,
            "date": "2018-08-24T16:22:09.000Z",
            "description": "Success"
        }
    ]
}
```

#### Return Codes
Code | Description
---- | -----------
200  | Data Found.
404  | ActivityID Incorrect or There is no Record.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Delete Subject

```http
DELETE /api/vf-os-enabler/subject/delete/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": "Delete Subjects: Successfully"

}
```

Use this API call whenever is needed to delete Subject.

#### Request
`DELETE /api/vf-os-enabler/subject/delete/:subjectid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
subjectid          | Identifies the Subject by ID.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

In the following Example it's delete subject related to specific subjectID:

```json
{
    "Result": true,
    "Reason": "Delete Subjects: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Delete Subjects: Successfully.
404  | SubjectsID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Delete Collections

```http
DELETE /api/vf-os-enabler/collection/delete/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": "Delete Collections: Successfully"

}
```

Use this API call whenever is needed to delete Collection.

#### Request
`DELETE /api/vf-os-enabler/collection/delete/:collectionsid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
collectionsid      | Identifies the Collections by ID.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

In the following Example it's delete collections related to specific collectionID:

```json
{
    "Result": true,
    "Reason": "Delete Collections: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Delete Collections: Successfully.
404  | CollectionsID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Delete Request

```http
DELETE /api/vf-os-enabler/request/delete/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": "Delete Request: Successfully"

}
```

Use this API call whenever is needed to delete Request.

#### Request
`DELETE /api/vf-os-enabler/request/delete/:requestid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
requestid          | Identifies the Request by ID.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

In the following Example it's delete request related to specific requestID:

```json
{
    "Result": true,
    "Reason": "Delete Request: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Delete Request: Successfully.
404  | RequestID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Enabler 3 - Delete Conditions

```http
DELETE /api/vf-os-enabler/condition/delete/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": "Delete RequestConditions: Successfully"

}
```

Use this API call whenever is needed to delete Collection.

#### Request
`DELETE /api/vf-os-enabler/condition/delete/:requestconditionsid`

#### URL Parameters

Resource Parameter   | Description
-------------------- | -----------
requestconditionsid  | Identifies the RequestConditions by ID.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

In the following Example it's delete requestCondition related to specific requestconditionsID:

```json
{
    "Result": true,
    "Reason": "Delete RequestConditions: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Delete RequestConditions: Successfully.
404  | RequestConditionsID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.

### Enabler 3 - Delete Activity

```http
DELETE /api/vf-os-enabler/activity/delete/1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-type: application/json
X-Powered-By: Express
Date: Tue, 29 Aug 2018 15:00:00 GMT
Connection: keep-alive
Transfer-Encondig: chunked

{
    "Result": true,
    "Reason": "Delete Activity: Successfully"

}
```

Use this API call whenever is needed to delete Collection.

#### Request
`DELETE /api/vf-os-enabler/activity/delete/:activityid`

#### URL Parameters

Resource Parameter | Description
------------------ | -----------
activityid         | Identifies the Activity by ID.

#### Return Payload

The API response will contain a JSON document with the property `Result`: **true**, **false** and the `Reason`.

In the following Example it's delete activity related to specific activityID:

```json
{
    "Result": true,
    "Reason": "Delete Activity: Successfully"

}
```

#### Return Codes
Code | Description
---- | ----
200  | Delete Activity: Successfully.
404  | ActivityID Incorrect.
500  | Internal Server Error - There was an unexpected error at some point during the processing of the request.


### Powered by:

![alt text](https://static.wixstatic.com/media/d65bd8_d460ab5a6ff54207a8ac3e7497af18c4~mv2_d_4201_2594_s_4_2.png "Quality Perfomance Evaluator Enabler")