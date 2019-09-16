require("custom-env").env();
port = process.env.PORT || 8080;

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
const db = require("./db");

app.listen(port);
console.log("API server started on Port: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require("./app/routes/approutes"); //importing route
routes(app); //register the route
