const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
  },
  diner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
  quantity: {
    type: Number,
    required: true,
  },
  timeOfMeal: {
    type: String,
    required: true,
  },
  daysInWeek: {
    type: [String],
    required: true,
  },
  deliveryMode: {
    type: String,
    required: true,
  },
  repeatsInMonth: {
    type: Number,
    required: true,
  },
  mealServing: {
    type: Number,
    required: true,
    default: 0,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
