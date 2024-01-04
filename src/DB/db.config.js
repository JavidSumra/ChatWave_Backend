const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";

let URL =
  ENV != "development"
    ? process.env.MONGO_URL
    : "mongodb://127.0.0.1:27017/ChatWave_Dev";

if (ENV === "test") {
  URL = "mongodb://127.0.0.1:27017/ChatWave_Test";
}
const connectDB = () => {
  try {
    mongoose.connect(URL);
    console.log("Connection Established with DataBase");
  } catch (error) {
    console.log("Error Encountered While Connecting to DB", error);
  }
};

module.exports = connectDB;
