"use strict";
	const AWS = require('aws-sdk'),
   	 dynamodb = new AWS.DynamoDB.DocumentClient();
  
  // this is for us to use Promise 
  AWS.config.setPromisesDependency(null);


exports.handler = function(event,context) {
 // tableName is name of our Table in DynamoDB
 var tableName = "CompanyTranscation";
 // .scan method from DynamoDB.Document() object 
 // returns all the data from that table, where query method
 // would be for specifying or adding constraint on what we want to query 
 var dynamoPromise = dynamodb.scan({TableName:tableName}).promise();
  
     dynamoPromise.then(TranscationsData => {
       // context.succeed will send the data back to our
       // api route and then stop the lambda process. 
  		context.succeed(container);
  	 });
  	 
  }).catch(TranscationErr => {
 	context.fail("Error While getting data from Transaction Table" + TranscationErr);
 });
 
};