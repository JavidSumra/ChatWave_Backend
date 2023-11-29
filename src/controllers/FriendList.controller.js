const mongoose = require("mongoose");
const User = require("../models/User")(mongoose);

// ! Test Controller
const Friendlist = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.tokenData.username });

    res.send(userData);
  } catch (error) {}
};

module.exports = Friendlist;
