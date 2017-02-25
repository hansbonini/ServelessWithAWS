#Serveless with AWS 

What if I told you AWS could or will save you some money, time and headaches. **(I am not affialate to AWS)**

#GOAL

Task: Go serverless ... say what ?

**Scenario: You are at work and your boss said listen Sam please make a serveless system, I heard it is good so do it...**

#TOOLS 

 Your setup before serveless (one of the many possible setups for a back-end)
 - 3 servers (where the 1rst one control the traffic requests, 2nd one run upload/download scripts, and the 3rd is your database) 



 **But what did your boss said go serverless ?**
 
 - It could be because He knows that the average time that any employees who had used the old system, spent at the most 4 mins to do what every they are doing (meaning upload and downloading data) .... So why the need of a server which run 24/7 ? He has a point right, that's why you could not get a raise since He is using that money to pay for server maintenance. :)


your setup with AWS 

- AWS API GATEWAY (where each endpoint will envoke one specif script)
- AWS LAMBDA (java, node.js, python environments)(but I will be using node.js) (at most 5 mins to run process)
- AWS DYNAMODB (<=25 items per batch)
 
**yes, these tools are managed tools, and we are only paying for what we are using**


Lambda: Let's just say it a service managed by Amazon AWS running on Linux enviroment, 
it allows you to run certain tasks up to 5 mins'.

 Tips: 

-Since Lambda is ran onto Linux environment, lauch an EC2 linux server or use linux 
on your computer to create the node project or npm install dependencies into your project.


#Set up 

you must have an aws account before we start

**On API GATEWAY** 
  - create 1 api with 1 ressource `/classifyInfo` with 1 `GET` and 1 `POST` Method 
  - we will also have `CORS` or CROSS ORIGIN RESSOURCE SHARING enable 
  - we will of course have `api keys` 

**On AWS Lambda** 

  - we will create 2 functions (where is for upload/ POST, download/ Get) 

**On AWS DynamoDB**
  - 1 table with an `Hash Key or Primary Key` "Transaction"

**IAM role is needed, just think of them as contract (permissions to do the job) between services, for example if you want your lambda to communicate with your DB, it needs a contract.**



**First Step:**

 -Log into `console.aws.amazon.com`
 
  **`Services` => `Security & Identities` => `IAM` => click on `Roles` => then `Create Role`**

**Give your Role a Name** : tutorial-iam-lambda-role

**Select Role Type**
   -From the `AWS Service Roles` DropDown menu select `AWS Lambda` 
   -Then look and select both **AmazonDynamoDBFullAccess** and **AWSLambdaBasicExecution**
   - Then create Role




**Second Step:**
   -Let's look for Lambda, ** `Services` => `Compute` => `Lambda` **

   - Then click on **Create a Lambda function**

  on the left you would see 
    - Select blueprint 
    - Configure triggers 
    - Configure function 
    - Review 

  so clicking on **Configure function** it will skip the first two steps (do that)
 
In the project, I provide you some code, so open the files then copy each code to their respective function:
   - first lambda function should name  `insertToBD`
   - second lambda function should name `GetFromDB`
  
- RunTime: should be Node.js 4.3 or higher (4.3.2 allows ES6 for node.js)

- For function handler and role, just follow the picture below:

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/Lambda-config.png" />
</p>


**Code Explanation**

AWS provides and class implementation for `DynamoDB.DocumentClient()` writing for every language but I will use the for javascript/Node.js, we will use the 
<ul>
<li>`scan`</li>
<li>`batchWrite` </li>
</ul>


**Third Step:**
- Let's look for DynamoDB, ** `Services` => `DataBase` => `DynamoDB` **
- click on `create Table`
- the table name should be `CompanyTranscation` 
- the primary Key should be `Transcation` of a `String Type`

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/dynamo-config.png" />
</p>


**Let's go back to LAMBDA to test to the communication between Lambda & DynamoDB'** 
 - let's try to save an array containing two objects such'

  `[`
    `{"Transcation":"MK0192", "Bank":"Citi", "Amount":1000},`
    `{"Transcation":"MK0172", "Bank":"Discover", "Amount":4000}`
 `]`


- **Services > Compute > Lambda**

- Then click on the `insertToDB` function => `Action` => `Configure Test` (where you paste that array of objects) => `Save and Test`

Under the Lambda Text Editor, you should see **Execution results: succeed**, so go to DynamoDB and check out your table if you don't believe me :)'

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/test.gif" />
</p>



**Fourth Step:**

let's look at API GateWay,  ** `Services` => `Application Services` => `API Gateway` **
- click on `Create API`, select `New API` then give an `API NAME` such as tuto
- now we have to add ressource or route to our api, so click on `Actions` Button next to Ressources (in the middle section)

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/setup-ressouces.png" />
</p>

**click on `Create Ressource`, enable CORS , and provide a `Ressource name` called it `classified-transcations`, and the ressource path would be the same as the name (api gateway does that automatically).**
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-ressource.png" />
</p>

** Now we have to add a method (HTTP VERB) in the middle section, so select the `classified-transcations`, Then click on `Actions` then `create Method` select `Get` then click on the checkbox near the HTTP verb.**

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-method.png" />
</p>

**Now our ressource method needs to call our lambda function, see the picture below** 
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-lambda-to-method.png" />
</p>

After pressing the `save` Button, you will see lambda asking for permission (see the picture below), but allow it  

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/api-gateway-asking-permission.png" width="350"/>
</p>

**Now we need to `Deploy` our api, so click on`Actions>Deploy API`, then our `deployment stage` should be `dev` because we are testing and we have yet to secure it.**

**so click on `Deployement Stage` then select `[New Stage]`, then the `stage Name` should be `dev`. After pressing the `Deploy` button, you should get that screen below**

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/deploy.png" />
</p>

**so the `Invoke url` that you see on the right side, it is the actuall api endpoint for both `POST` and `GET` HTTP Verbs for our ressource; So click on the link to see the data from your DB.**

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/api-live.png" />
</p>


That is it for now, explore these services on your own. If you have an questions create an `Issue`.
Part Two of this tutorial is coming soon.


