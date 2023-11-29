const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User")(mongoose);

const CreateUser = async (req, res) => {
  const { firstName, lastName, email, mobileNO, password, userRole } = req.body;
  try {
    // Checking for User Existance
    const isUserExistWithSameEmail = await User.findOne({ email });
    const isUserExistWithSameNumber = await User.findOne({ mobileNO });

    if (isUserExistWithSameEmail) {
      res.status(404).json({ msg: "User Already Exist With Provided Email" });
    } else if (isUserExistWithSameNumber) {
      res
        .status(404)
        .json({ msg: "User Already Exist With Provided Mobile Number" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const addNewUser = await User.create({
        firstName,
        lastName,
        email,
        mobileNO,
        password: hashPassword,
        userRole,
      });
      console.log(addNewUser);
      res.status(200).json({ User: "User Created Successfully" });
    }
  } catch (error) {
    console.log("Error While Creating User", error);
  }
};

module.exports = CreateUser;
