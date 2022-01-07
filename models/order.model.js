const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  diner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
    required: true,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
    required: true,
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
    type: {
      used: {
        type: Number,
        default: 0,
      },
      unused: {
        type: Number,
        default: 0,
      },
    },
  },
  finishedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderSchema);
