const routes = require("express").Router();
const CreateUser = require("../controllers/UserRegister.controller");
const LoginUser = require("../controllers/UserLogin.controller");

const { validateToken } = require("../middlewares/authentication");

routes.get("/", (req, res) => {
  res.send("Server Working Properly");
});

routes.post("/Users/Signup", CreateUser);

routes.post("/Users/Signin", LoginUser);

routes.get("/chat", validateToken, (req, res) => res.send("Authenticate"));
module.exports = routes;
