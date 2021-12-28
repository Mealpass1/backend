const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dinerSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
  },
});

module.exports = mongoose.model("Diner", dinerSchema);
