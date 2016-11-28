"use strict";
	const  AWS = require("aws-sdk"),
    docClient = new AWS.DynamoDB.DocumentClient();

   AWS.config.setPromisesDependency(null);

exports.handler = function(event,context){
  // event would contains the data which we want to save to our DB
  
var itemContainer = [] , dynamoPromise; // p1 is for the promise object

// here we are making sure that event is an Array 
if((event instanceof Array) && (event) && (event !== "undefined")) {

    event.forEach(function(eachObjectFromIncomingBatch){
        // eachObjectFromIncomingBatch represents each object in the array of objects
         itemContainer.push({"PutRequest":{"Item": eachObjectFromIncomingBatch } });
    });
      // once the array is filled then we call 
      if (itemContainer.length > 0) {
      var params = { RequestItems: { "CompanyTranscation": itemContainer } };
           dynamoPromise = docClient.batchWrite(params).promise();
      }
 }

  dynamoPromise.then(function(data) {
    context.succeed("Data ==> DynamoDB Table"); 
  }).catch(function(err){
  	context.fail("Error Found while trying to save batch items into dynanmodb: " + err);
  });
} // end of function 