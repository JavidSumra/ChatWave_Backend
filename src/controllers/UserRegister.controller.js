const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Utility Function for Mail
const mail = require("../utils/nodemailer");

const { generateAccessToken } = require("../middlewares/authentication");

const User = require("../models/User")(mongoose);
// Subject for Mail
const subject = "Welcome to ChatWave: Your New Hub for Seamless Communication!";

const CreateUser = async (req, res) => {
  // Destruct Body Content
  const { firstName, lastName, email, mobileNO, password, userRole } = req.body;
  try {
    // Checking for User Existence
    const isUserExistWithSameEmail = await User.findOne({ email });
    const isUserExistWithSameNumber = await User.findOne({ mobileNO });

    if (isUserExistWithSameEmail) {
      res.status(404).json({ error: "User Already Exist With Provided Email" });
    } else if (isUserExistWithSameNumber) {
      res
        .status(404)
        .json({ error: "User Already Exist With Provided Mobile Number" });
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
      // Sending Mail
      //Todo : Uncomment mail(email, subject, generateMessage(firstName, lastName));

      // Sending User Data and Corresponding token for User
      res
        .status(200)
        .json({ User: addNewUser, token: generateAccessToken(email) });
    }
  } catch (error) {
    console.log("Error While Creating User", error);
  }
};

const generateMessage = (firstName, lastName) => {
  return `Dear ${firstName} ${lastName},

  We're excited to extend a warm welcome to you at ChatWave, where seamless communication converges with unparalleled efficiency! As a new member, you now have access to a dynamic platform designed to empower collaboration, foster teamwork, and streamline communication for your projects.
          
  Feel free to explore and leverage the full potential of ChatWave. Should you have any questions or require assistance, our dedicated support team is at your service. Simply reply to this email, and we'll be delighted to assist you.
          
  Thank you for selecting ChatWave as your communication platform. We're eager to contribute to enhancing your collaboration experience.
          
Best regards,
ChatWave Team`;
};

module.exports = CreateUser;
