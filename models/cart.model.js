const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);