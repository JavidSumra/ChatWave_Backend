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
    ? "https://chatwavejavid.netlify.app"
    : "http://localhost:5173";

const server = http.createServer(http);
const SocketPort = process.env.PORT | 3001;

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
    origin: [URL, "http://localhost:5173", "https://chatwavejavid.netlify.app"],
    methods: ["GET", "POST"],
  },
});

connectDB();

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connect", (socket) => {
  socket.on("send_msg", ({ senderId, receiverId, msg }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("receive_msg", { senderId, msg });
  });

  socket.on("addUser", (data) => {
    data && addUser(data, socket.id);
    socket.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log(`User Removed With ${socket.id}`);
    removeUser(socket.id);
  });
});

server.listen(SocketPort, () => {
  console.log("Server Started on", SocketPort);
});

app.use(routes); //Routes Definition
module.exports = app;
