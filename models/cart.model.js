const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  //dish staffs
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
  //packages staffs
  name: {
    type: String,
  },
  restaurants: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Restaurant" }],
    required: true,
  },
  dishes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
    required: true,
  },
  //common to both
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  price: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["package", "dish"],
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
