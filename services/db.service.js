const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const connection = mongoose.connect(process.env.DB, {}, () => {
  console.log("Database connected");
});

module.exports = connection;
