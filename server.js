// declaring needed app variables(express, dotenv , path )
const express = require("express");
const app = express();
const db = require("./controllers/db");
const dotenv = require("dotenv");
const path = require("path");
const { urlencoded } = require("express");
const port = 3000;

// setting paths to .env file and public directories
dotenv.config({ path: "./.env" });
const publicDirectory = path.join(__dirname, "./public");

// telling express to use public directory for static files
app.use(express.static(publicDirectory));

// parse url encoded data as sent by html file
app.use(express.urlencoded({ extended: false }));

// parse json data that will be sent by htnl form
app.use(express.json());

// setting view engine to hbs
app.set("view engine", "hbs");

// connecting to databes
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL database connected");
  }
});

// routes
// using our router instead of creating routes in the main server
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => console.log(`Server running on port ${port}`));
