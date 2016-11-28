#Serveless with AWS 

Say goodbye to Managing Server a moment of silence please :) it was fun, and welcome to AWS Lambda. 

#GOAL

Task: Create an upload system that allows employers to upload data into their company DataBase.

#TOOLS 

- So before serverless approach, you would be thinking of having 2 servers run for the upload scripts and one for balancing request to your app server. Maybe that was the reason you never like doing back-end jobs at all lol. But AWS is here for rescue.  

- AWS API GATEWAY 
- AWS LAMBDA (java, node.js, python environments)(but I will be using node.js)
- AWS DYNAMODB (<=25 items per batch)
 
yes, these tools are managed tools, and we are only paying for what we are using


Lambda: Let's just say it a service managed by Amazon AWS running on Linux enviroment, 
it allows you to run certain tasks up to 5 mins'.

 Tips: 

-Since Lambda is ran onto Linux environment, lauch an EC2 linux server or use linux 
on your computer to create the node project or npm install dependencies into your project.

-As of today Lambda is not yet compatible to javascript ES6 so we will be using ES5; but I know AWS engineers are working on that like zombies looking for blood. 


#Set up 

you must have an aws account before we start

**On API GATEWAY** 
  - create 1 api with 1 ressource `/classifyInfo` with 1 GET and 1 POST Method 
  - we will also have CORS or CROSS ORIGIN RESSOURCE SHARING enable 
  - we will of course have api keys 

**On AWS Lambda** 

  - we will create 2 functions where 1 is for POST VERB, and the 2nd for GET VERB

**On AWS DynamoDB**
  - 1 table with an Hash Key or Primary Key "Transaction"

Always as you are doing this you will need IAM role, just think of them as contract between services, for example if you want your lambda to communicate with your DB, it needs a contract.



First Step:

 -Log into `console.aws.amazon.com`
 -On the top left corner in the navigation bar you will see `Services`, click on it then look for 
  `Security & Identities` section then click on iam 

 -Once in the **IAM page**, click on `Roles` on the left side, then `Create Role`

**Give your Role a Name** : tutorial-iam-lambda-role

**Select Role Type**
   -From the `AWS Service Roles` DropDown menu select `AWS Lambda` 
   -Then look and select both **AmazonDynamoDBFullAccess** and **AWSLambdaBasicExecution**
   - Then create Role

Second Step: 
   -Let's look for Lambda, **Services > Compute > Lambda**

   - Then click on **Create a Lambda function**

  on the left you would see 
    - Select blueprint 
    - Configure triggers 
    - Configure function 
    - Review 

 we are going to skip both 1rst and 2nd option, so click on **Configure function**
 
In the project, I provide you some code, so open the files then copy each code to their respective function:
   - first lambda function should name  `insertToBD`
   - second lambda function should name `GetFromDB`
  
- RunTime: should be Node.js 4.3

- For function handler and role, just follow the picture below:

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/Lambda-config.png" width="350"/>
</p>


AWS provides and class implementation for `DynamoDB.DocumentClient()` writing for every language but I will use the for javascript/Node.js, we will use the 
`scan` and `batchWrite` methods from that class.


Third Step:

- Let's look for DynamoDB, **Services > DataBase > DynamoDB**
- click on `create Table`
- the table name should be `CompanyTranscation` 
- the primary Key should be `Transcation` of a `String Type`

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/dynamo-config.png" width="350"/>
</p>


**Let's test to see if Lambda can talk to DynamoDB'** 
 - let's try to save an array containing two objects such'

  `[`
    `{"Transcation":"MK0192", "Bank":"Citi", "Amount":1000},`
    `{"Transcation":"MK0172", "Bank":"Discover", "Amount":4000}`
 `]`

so you will need to go back to Lambda
- **Services > Compute > Lambda**
- Then click on the `insertToDB` function 
- Then click on `Action` then `Configure Test` where you paste that array of objects 
- Then click `Save and Test`

Under the Lambda Text Editor, you should see **Execution results: succeed**, so go to DynamoDB and check out your table if you don't believe me :)'

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/test.gif" width="350"/>
</p>

Fourth Step: 

let's look at API GateWay,  **Services > Application Services > API Gateway**
- click on `Create API`, select `New API` then give an `API NAME` such as tuto
- now we have to add ressource or route to our api, so click on `Actions` Button next to Ressources (in the middle section)

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/setup-ressouces.png" width="350"/>
</p>

- click on `Create Ressource`, enable CORS , and provide a **Ressource name** called it `classified-transcations`, and the ressource path would be the same as the name (api gateway does that automatically).
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-ressource.png" width="350"/>
</p>
- Now we have to add a method (HTTP VERB) in the middle section, so select the `classified-transcations`, Then click on `Actions` then `create Method` select `Get` then click on the checkbox near the HTTP verb.
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-method.png" width="350"/>
</p>

- Now our ressource method needs to call our lambda function, see the picture below 
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/adding-lambda-to-method.png" width="350"/>
</p>

after pressing the `save` Button, you will see lambda asking for permission (see the picture below), but allow it  
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/api-gateway-1asking-permission.png" width="350"/>
</p>

Now we need to `Deploy` our api, so click on **Actions>Deploy API**, then our **deployment stage** should be `dev` because we are testing and we have yet to secure it.

so click on `Deployement Stage` then select `[New Stage]`, then the `stage Name` should be `dev`. After pressing the `Deploy` button, you should get that screen below

<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/deploy.png" width="350"/>
</p>

so the Invoke url that you see on the right side, it is the actuall api endpoint for both POST and Get HTTP Verbs for our ressource; So click on the link to see the data from your DB.
<p align="center">
<img src="https://github.com/LamourBt/ServelessWithAWS/blob/dev/screenshots/api-live.png" width="350"/>
</p>


That is it for now, explore these services on your own. If you have an questions create an `Issue`.
Part Two of this tutorial is coming soon.


