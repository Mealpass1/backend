const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  inviter: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  diner: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  menu: {
    type: mongoose.Types.ObjectId,
    ref: "Menu",
  },
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
