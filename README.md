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
![when the extended:false](image.png)

case2 : extended : true
![when the extended:true](image-1.png)

now we got the data in the console that was passed in the postman.
now we need to send this data in the MOCK_DATA.json. HOW???
using fs module

<!-- hu aaeuuu kehuuuuu keva mangato hato ke -->
