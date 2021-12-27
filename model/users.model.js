const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    min: 3,
    max: 35,
  },
  email: {
    type: String,
    min: 15,
    max: 50,
    required: true,
  },
  username: {
    type: String,
    min: 5,
    max: 15,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 8,
  },
  role: {
    type: String,
    default: "normal",
  },
  cart: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
  },
});

module.exports = mongoose.model("Users", userSchema);
