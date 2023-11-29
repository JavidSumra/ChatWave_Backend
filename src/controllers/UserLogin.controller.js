const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User")(mongoose);

const { generateAccessToken } = require("../middlewares/authentication");

const LoginUser = async (req, res) => {
  // Destruct Body Content
  const { email, password } = req.body;

  try {
    // Check for User Existence
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (isPasswordCorrect) {
        res.status(200).json({
          User: isUserExist,
          token: generateAccessToken(isUserExist.email),
        });
      } else {
        res.status(402).json({ error: "Wrong Email or Password" });
      }
    } else {
      res.status(402).json({ error: "User Not Exist" });
    }
  } catch (error) {
    console.log("Encounter An Error while Login", error);
  }
};

module.exports = LoginUser;
