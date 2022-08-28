// stored the port in constant
const port = 4000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// this is the POST route that will receive the data that come from the clint side
app.post("/saveData", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
});

/* this is the GET route that will send  the data that have been saved by POST
to the client side*/
app.get("/getData", (req, res) => {
  res.status(200).send(projectData);
});

// this route is to bind and listen the connections on the specified host and port.
app.listen(port, () => {
  console.log(`server works on port ${port}`);
});
