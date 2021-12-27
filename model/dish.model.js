const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurant_id: {
    type: String,
    required: true,
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
  discountStatus: {
    type: String,
    required: false,
    default: "off",
  },
  discountValue: {
    type: Number,
    required: false,
    default: 0,
  },
  additionalTopping: {
    type: [
      {
        toppingName: {
          type: String,
          required: false,
        },
        toppingPrice: {
          type: Number,
          required: false,
        },
      },
    ],
  },
});
module.exports = mongoose.model("Dishes", dishSchema);
