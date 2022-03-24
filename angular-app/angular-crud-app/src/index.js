const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const port = 4000;
//create express app
const app = express();
app.use(cors());
//to parse json-tyoe data
app.use(bodyparser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
//port at which the server will run
//create end point
app.get("/", (request, response) => {
  //send 'Hi, from Node server' to client
  response.send("Hi, from Node server");
});

//Sql Setup(CONNECTION)
const connection = mysql.createConnection({
  host: "sql3.freemysqlhosting.net",
  user: "sql3480401",
  password: "zgMrT23JKK",
  database: "sql3480401",
  port: 3306
});

//connect to database
connection.connect();
//retrieve all the records
app.get("/users", (req, res) => {
  connection.query("Select * from practice", (error, results, fields) => {
    if (error) throw error;
    return res
      .status(200)
      .send({ error: false, data: results, message: "users list." });
  });
});

//retrieve data with id
app.get("/users/:id", function (req, res) {
  let id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: true, message: "Please provide id" });
  }

  connection.query("SELECT * FROM practice where id=?", id, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: "users list." });
  });
});

// Add a new user
app.post("/users", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;

  const sql = `INSERT INTO practice(name, email) VALUES ('${name}', '${email}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("data inserted");
    }
  });
});

// UPDATE A USER
app.put("/users/:id", function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;

  if (!id || !name || !email) {
    return res
      .status(400)
      .send({ error: name, message: "Please provide user and id" });
  }
  const sql = `UPDATE practice SET name = '${name}', email='${email}' WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Data Updated");
    }
  });
});

//DELETE A USER
//  Delete user
app.delete("/users/:id", function (req, res) {
  let id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: true, message: "Please provide id" });
  } else {
    let query = `DELETE FROM practice WHERE id=${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data Deleted");
      }
    });
  }
});

// HOME PORT
//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
