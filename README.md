REST API - JSON, Javascript Object (It can be another like text, image, HTML, etc )

- **GET** : Retrieve data from the server
  GET /api/users - give us list of all users // DONE
  GET /api/users/1 - give us user with id 1
  GET /api/users/:id - give us user with dynamic id, :id is the variable now.

- **POST** : Send data to the server to create a new resource
  POST /api/users - create a new user

- **PATCH** :
  When you want to update only specific attributes of a resource.
  PATCH /api/users/1 - update user with id 1
  Applies partial modifications to a resource. Only the fields provided in the request body are updated; other fields remain unchanged.
  Like if you only want to change the job status of user id 1

- **PUT** : Update an existing resource on the server
  When you want to update a resource completely.
  Replaces the entire resource at the given URI with the data provided in the request body.
  Like if you only want to change the entire detail of user id 1

  PUT is for completely replacing a resource.
  PATCH is for partially updating a resource.

- **DELETE** : Delete a resource from the server

REMEMBER :
best practices : always respect all http request ( GET, POST, Put, Patch and Delete )
Client-server Architecture : We should know who is the client ( brower, app, alexa, etc )

if request is : "/api/users/" ---> we are going to send a json
if request is : "/users/" ---> we are going to send a HTML

---

## Done with get request.

## Learning POST,PUT,PATCH, DELETE

Browser by default use Get request so we will learn POST, PATCH, PUT, DELETE separartely

We can't use browser for this as it use get method.
So we are going to use POSTMAN.

So in POST we are going to create a new user.
STEPS : ENTER THE DETAIL OF USERS LIKE ID, FIRSTNAME, LASTNAME, GENDER, JOB_TITLE... INSIDET THE x-www-form-urlencoded in the KEY-value pair

But the thing is after clicking the send button on the postman, i want the form data to be in the json file. or recieve in the broswer

so we are going to get that data in the body how?
const body = req.body; <--- whatever we are sending is inside the body.
console.log(body) <--- undefined, even after sending the data from postman
because the express don't know what type of data is coming in the body and how to handle it.
so to handle this issue, we use a middleware. How??
app.use(express.urlencoded({extended:false}))
case1 : extended :false
![extended:false](image-1.png)

case2 : extended : true
![extended:true](image.png)

now we got the data in the console that was passed in the postman.
now we need to send this data in the MOCK_DATA.json. HOW???
using fs module

## DONE WITH THE PATCH

---

### USING MIDDLEWARE

they are the functions that have access to the request and the response and the next middleware function in the application request-response cycle ( if there is multiple middleware between client and server)

they perform the following tasks :

- Execute any code
- Modify the request and response objects
- Call the next middleware function in the stack
- End the request-response cycle.

Syntax:
app.use((req,res,next)=>{
// code to be executed
})

CASE 1 :
if there is a middleware m1 and then it goes to method function.
but that middleware neither send any resposnse nor it pass the request further which means its holding the request.
(BAD PRACTICE)

m1 : app.use(express.urlextended({extended : false}))
m2 : app.use((req,res,next)=>{
// code to be executed
console.log("Hello from the MiddleWare 2");
})

<!-- final function to be run -->

app.get('/api/users',(req.res)=>{
return res.json(users)
})

OUTPUT : USER WON't get response and the postman will be on infinnite loading.

CASE2 : Returning the response from middleware so that they won't go further to the function method or the routes.
Reason behind : For authentication where we found something suspecious or wrong or feels like the request is made from a unauthorized user or a hacker.

m1 : app.use(express.urlextended({extended : false}))
m2 : app.use((req,res,next)=>{
// code to be executed
console.log("Hello from the MiddleWare 2");
return res.json({STATUS : "NOT MOVING FURTHER - BY MIDDLEWARE"})
})

<!-- final function to be run -->
<!--  This will not be called -->

app.get('/api/users',(req.res)=>{
return res.json(users)
})
