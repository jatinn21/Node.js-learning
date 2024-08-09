//we require express for working with the api
const express = require("express");

// for file operations like read,write, update in the file.
const fs = require("fs");

// now we also need a custom json data, used mockaroo (Random Data Generator)
const users = require("./MOCK_DATA.json");

// now we need to buit an app instance using express
const app = express();

// using middleware for handling the req body.
app.use(express.urlencoded({ extended: false }));

// need to make a port number on which we will be working on
const PORT = 8000;

//  making a get request for getting all the list of users but sending the JSON FORMAT.
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//  making a get request for getting all the list of users but sending the HTML FORMAT.
app.get("/users", (req, res) => {
  const html = `
    ${users
      .map((user) => {
        return `
            <ul>
            <li>${user.first_name}</li>
            </ul>
        `;
      })
      .join(" ")}
    `;
  res.send(html);
});

//  making a get request for getting a particular user detail but sending the JSON.
app.get("/api/users/1", (req, res) => {
  return res.json(users.find((user) => user.id === 1));
});

//  making a get request for getting a particular user detail but sending the HTML.
app.get("/users/1", (req, res) => {
  const user = users.find((user) => user.id === 1);
  const html = `
  <h1>
    Good Morning ${user.first_name + " " + user.last_name} , Working as ${
    user.job_title
  }, Gender : ${user.gender}
  </h1>`;
  return res.send(html);
});

// To make the id dynamic, there is a term Dynamic path parameter ( id ), we don't need to make users/1, users/2....
// use  ":id"
app.get("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// app.get("/users/:id/:surname", (req, res) => {
//   const id = +req.params.id;
//   //req.params returns a  string

//   console.log(req.params);
//localhost:8000/users/201/josn
// { id: '201', surname: 'josn' }

//   const user = users.find((user) => user.id === id);
//   const html = `
//   <h1>
//   Good Morning ${user.first_name + " " + user.last_name} , Working as ${
//     user.job_title
//   }, Gender : ${user.gender}
//     </h1>`;
//   return res.send(html);
// });

// Creating a new user using POST method
// also getting the body details that were filed in postman and send from urlencoded.
// first it was undefined , the body we recieved was undefined but we can handle it using middleware

app.post("/api/users/", (req, res) => {
  // TODO: Create a new user
  const body = req.body;
  console.log("MYBODY : ", body);

  users.push({ ...body, id: users.length + 1 });

  //to write in the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "success",
      idGenerated: users.length,
      userName: body.first_name,
    });
  });
});

// Updating a field in existing user using PATCH method
app.patch("/api/users/:id", (req, res) => {
  // TODO: Updating a field with id ( variable )
  const body = req.body;
  const id = +req.params.id;
  users.forEach((user, index) => {
    user.id === id ? (users[index] = { ...user, ...body }) : null;
  });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "successfully updated Email",
    });
  });
});

// Updating the whole user using PUT method
app.put("/api/users/:id", (req, res) => {
  // TODO: Updating the whole user with id ( variable )v
  return res.json({ status: "Updating everything, pending" });
});

app.delete("/api/users/:id", (req, res) => {
  // TODO: deleting a new user with id ( variable )
  return res.json({ status: "Deleting a user, pending" });
});

// now we will listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//  If the path or the url is same in get, put or patch like  '/api/users/:id', we can merge all in one and will be called according to the method used.
// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = +req.params.id;
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   //   .post("/api/users", (req, res) => {
//   //     // TODO: Create a new user
//   //     return res.json({ status: "pending" });
//   //   })
//   .patch((req, res) => {
//     // TODO: Updating a field with id ( variable )
//     return res.json({ status: "Updating a field, pending" });
//   })
//   .put((req, res) => {
//     // TODO: Updating the whole user with id ( variable )v
//     return res.json({ status: "Updating everything, pending" });
//   })
//   .delete((req, res) => {
//     // TODO: deleting a new user with id ( variable )
//     return res.json({ status: "Deleting a user, pending" });
//   });
