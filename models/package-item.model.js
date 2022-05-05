const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const packageItemSchema = new Schema({
  package: {
    type: mongoose.Types.ObjectId,
    ref: "Package",
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
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

module.exports = mongoose.model("Admin-cart", packageItemSchema);
