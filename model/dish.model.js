const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
  dishName: {
    type: String,
    required: true,
    max: 18,
    min: 5,
  },
  dishCategory: {
    type: Number,
    required: true,
  },
  dishDescription: {
    type: String,
    required: true,
    max: 255,
    min: 20,
  },
  dishPrice: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  discountValue: {
    type: Number,
    required: false,
    default: 0,
  },
});
module.exports = mongoose.model("Dish", dishSchema);
