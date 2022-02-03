const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  invite: {
    type: {
      from: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
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
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
  },
});

module.exports = mongoose.model("Menu", menuSchema);
