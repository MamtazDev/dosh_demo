require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ds5s8q.mongodb.net/doshCapital`,
      {
        serverSelectionTimeoutMS: 50000,
      }
    );
    console.log("mongodb connection success!");
  } catch (err) {
    console.log("mongodb connection failed", err.message);
  }
};

module.exports = connectDB;
