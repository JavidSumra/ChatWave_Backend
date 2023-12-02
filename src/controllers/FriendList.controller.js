const mongoose = require("mongoose");
const User = require("../models/User")(mongoose);

// ! Test Controller
const Friendlist = async (req, res) => {
  try {
    let friendList = await User.find({});

    friendList = friendList.filter(
      (friend) => friend.email != req.tokenData.username
    );

    res.status(200).json({ Friends: friendList });
  } catch (error) {
    console.log(`Error While Fetching Friend List`, error);
    res.status(402).json({ error: "Failed To Fetch API Sorry" });
  }
};

module.exports = Friendlist;
