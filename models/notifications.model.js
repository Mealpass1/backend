const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  diner: {
    type: Schema.Types.ObjectId,
    ref: "Diner",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: "Menu",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: "Dish",
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
