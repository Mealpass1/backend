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
  price: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  timeOfMeal: {
    type: String,
  },
  daysInWeek: {
    type: [String],
  },
  deliveryMode: {
    type: String,
  },
  toppings: {
    type: [
      {
        name: String,
        price: Number,
      },
    ],
  },

  //packages staffs
  package: {
    type: mongoose.Types.ObjectId,
    ref: "Package",
  },
  restaurants: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Restaurant" }],
  },
  dishes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
  },

  //common to both
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  type: {
    type: String,
    required: true,
    enum: ["package", "dish"],
  },
  mealServing: {
    type: Number,
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
