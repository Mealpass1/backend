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
  cart: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
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

module.exports = mongoose.model("Order", orderSchema);
