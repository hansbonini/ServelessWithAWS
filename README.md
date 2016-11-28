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
<img src="https://github.com/LamourBt/ServelessWithAWS/tree/dev/screenshots/Lambda-config.png" width="350"/>
</p>


AWS provides and class implementation for `DynamoDB.DocumentClient()` writing for every language but I will use the for javascript/Node.js, we will use the 
`scan` and `batchWrite` methods from that class.





