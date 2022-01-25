const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  inviter: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
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
        status: {
          type: String,
          enum: ["pending", "complete"],
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
          type: mongoose.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Menu", menuSchema);
