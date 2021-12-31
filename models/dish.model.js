const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  diners: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Dish", dishSchema);
