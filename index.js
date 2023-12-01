const app = require("./src/main");
const PORT = process.env.PORT || 3007;

const server = app.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});

const URL =
  process.env.NODE_ENV === "production"
    ? "https://chatwavejavid.netlify.app"
    : "http://localhost:5173";

const io = require("socket.io")(server, {
  cors: {
    origin: [
      URL,
      "http://localhost:3007",
      "https://chatwave-tulv.onrender.com",
      "https://chatwavejavid.netlify.app",
    ],
    methods: ["GET", "POST"],
  },
});

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
