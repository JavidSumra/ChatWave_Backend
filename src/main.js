const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  connectDB = require("./DB/db.config.js"),
  routes = require("./routes/routes.js");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatwave-tulv.onrender.com"],
    credentials: true, // Cookies Can Sent With Request
  })
);

connectDB();

app.use(routes); //Routes Definition

module.exports = app;
