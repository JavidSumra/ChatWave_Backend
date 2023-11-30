const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  connectDB = require("./DB/db.config.js"),
  routes = require("./routes/routes.js");

// Http Server for Socket
const http = require("http");
const { Server } = require("socket.io");

const URL =
  process.env.NODE_ENV === "production"
    ? "https://chatwave-tulv.onrender.com"
    : "http://localhost:5173";

const server = http.createServer(http);
// !Change it

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
    ],
    credentials: true, // Cookies Can Sent With Request
  })
);

const io = new Server(server, {
  cors: {
    origin: [URL, "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

connectDB();

io.on("connect", (socket) => {
  console.log(`Hello ${socket.id}`);

  socket.on("send_msg", (data) => {
    console.log(data);
  });

  socket.on("join_room", (id) => {
    console.log("Joined to ", id);
    socket.join(id);
  });
});

server.listen(3001, () => {
  console.log("Server Started");
});

app.use(routes); //Routes Definition
module.exports = app;
