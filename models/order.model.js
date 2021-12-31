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
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  handledAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
});

orderSchema.methods.addOrders = ({ restaurant, cart }, diner) => {
  for (let item of cart) {
    const order = new mongoose.model("Order");
    order.diner = diner;
    order.restaurant = restaurant;
    order.cart = item;
    order.createdAt = Date.now();
    order.save();
  }
  return new Promise((resolve, reject) => {
    resolve("done");
  });
};

module.exports = mongoose.model("Order", orderSchema);
