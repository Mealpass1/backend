const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  diner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
  createdAt: {
    type: Date,
  },
});

menuSchema.methods.addMenu = ({ restaurant, cart }, diner) => {
  for (let item of cart) {
    const menu = new mongoose.model("Menu");
    menu.diner = diner;
    menu.restaurant = restaurant;
    menu.cart = item;
    menu.createdAt = Date.now();
    menu.save();
  }
  return new Promise((resolve, reject) => {
    resolve("done");
  });
};

module.exports = mongoose.model("Menu", menuSchema);
