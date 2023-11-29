const routes = require("express").Router();
const CreateUser = require("../controllers/UserRegister.controller");
const LoginUser = require("../controllers/UserLogin.controller");

const { validateToken } = require("../middlewares/authentication");
const Friendlist = require("../controllers/FriendList.controller");

routes.get("/", (req, res) => {
  res.send("Server Working Properly");
});

routes.post("/Users/Signup", CreateUser);

routes.post("/Users/Signin", LoginUser);

routes.get("/chat", validateToken, Friendlist);

module.exports = routes;
