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
  toppings: {
    type: [
      {
        name: String,
        price: Number,
      },
    ],
  },
  mealServing: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Package-item", packageItemSchema);
