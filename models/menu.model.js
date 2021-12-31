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
  used: {
    type: Boolean,
    default: false,
  },
  shared: {
    type: Boolean,
    default: false,
  },
  usage: {
    type: [
      {
        date: {
          type: Date,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  sharing: {
    type: [
      {
        date: {
          type: Date,
        },
        to: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Menu", menuSchema);
