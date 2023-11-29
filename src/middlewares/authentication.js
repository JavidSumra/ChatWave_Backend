require("dotenv").config();

const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const generateAccessToken = (username) => {
  return jwt.sign({ username }, SECRET_TOKEN, { expiresIn: "1800s" });
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
};

module.exports = { generateAccessToken, validateToken };
