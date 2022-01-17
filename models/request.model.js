const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  diner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  dish: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  order: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Requests", requestSchema);
