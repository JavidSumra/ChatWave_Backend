const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  connectDB = require("./DB/db.config.js"),
  routes = require("./routes/routes.js");

// Http Server for Socket

// const server = http.createServer(http);
// const SocketPort = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://localhost:3007",
      "http://localhost:5173",
      "http://192.168.103.45:5173",
      "https://chatwavejavid.netlify.app",
      "https://chatwave-tulv.onrender.com",
    ],
    credentials: true, // Cookies Can Sent With Request
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

if (process.env.NODE_ENV !== "test") connectDB();

// server.listen(SocketPort, () => {
//   console.log("Server Started on", SocketPort);
// });

app.use(routes); //Routes Definition
module.exports = app;
