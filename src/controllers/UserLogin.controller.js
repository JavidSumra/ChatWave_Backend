const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User")(mongoose);

const { generateAccessToken } = require("../middlewares/authentication");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExist.password
      );
      if (isPasswordCorrect) {
        res.status(200).json({
          User: isUserExist,
          token: generateAccessToken(isUserExist.firstName),
        });
      } else {
        res.status(402).json({ msg: "Wrong Email or Password" });
      }
    } else {
      res.status(402).json({ msg: "User Not Exist" });
    }
  } catch (error) {
    console.log("Encounter An Error while Login", error);
  }
};

module.exports = LoginUser;
