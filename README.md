# Build REST APIs in node.js using Express framework
A simple Node.js application illustrating usage of Express framework for building REST APIs in Node.js.

## Requirements
npm packages:
1) npm express is a fast robust routing web framework for node
2) npm nodemon is a tool that detects any file changes automatically
3) npm joi is data validator for JavaScript
3) npm dotenv loads environment variables from .env file

Use npm to install the following packages 
```bash
  npm install express
  npm install -g nodemon
  npm install joi
  npm install dotenv
```
Postman: Either add Chrome Postman extension or Install Postman app. For HTTP services say Post, Put methods in Postman, select---> Body-->raw->Text->JSON(application/json)

 
## Basic Configuration
Assign environment variable.

Method 1: Create '.env' file at the node.js project root directory and add the following entry

PORT=<PORT_NUMBER> (ex: PORT=3000)

Method 2: From cmd where you intend to run the file, execute the following cmd
```bash
For windows: set PORT=<PORT_NUMBER> 
For Mac:  export PORT=<PORT_NUMBER>
```

## Running the node .js files
This sample node.js application uses npm express framework and joi validation tool for building REST APIs and validating the body schema.
Usability: Run the following js file
```bash
 nodemon .\Nodejs_Build_RESTAPI_CRUD.js
```

## Test REST APIs
User must know how to work with Postman.
Go to Postman app and test these REST APIs
1) GET: http://localhost:<PORT_NUMBER>   
  //ex: http://localhost:3000--->returns string "Dishes Menu"
2) GET:  http://localhost:<PORT_NUMBER>/api/dishes   
  //returns dishes' json array
3) GET: http://localhost:<PORT_NUMBER>/api/dishes/3 
  //returns dish no.#3
4) POST: http://localhost:<PORT_NUMBER>/api/dishes
   
   Body: {"name": <Any_dish_name>}   
   //ex: {"name": "Chicken Wings"} // returns next added dish to array
5) PUT: http://localhost:<PORT_NUMBER>/api/dishes/4
   
   Body: {"name": <Any_dish_name>}   
   //ex: {"name": "bread sticks"} //returns updated no.4 dish
6) DELETE:  http://localhost:<PORT_NUMBER>/api/dishes/7  
   //returns json array of the deleted dish no.7
7) POST: http://localhost:<PORT_NUMBER>/api/dishes
   Body: {"name": "fish"}  
   // returns validation of name - "name" length must be at least 6 characters long
8) PUT:  http://localhost:<PORT_NUMBER>/api/dishes/3
   Body: {}   
   //returns validation of name - "name" is required
