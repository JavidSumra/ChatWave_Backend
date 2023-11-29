const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
const URL =
  ENV != "development" ? process.env.MONGO_URL : "mongodb://localhost:27017";

console.log(URL);

const connectDB = () => {
  try {
    mongoose.connect(URL);
    console.log("Connection Established with DataBase");
  } catch (error) {
    console.log("Error Encountered While Connecting to DB", error);
  }
};

module.exports = connectDB;
