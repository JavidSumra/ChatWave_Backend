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
    origin: ["http://localhost:5173", "https://chatwavejavid.netlify.app"],
    credentials: true, // Cookies Can Sent With Request
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
connectDB();

app.use(routes); //Routes Definition

module.exports = app;
