const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  cashout: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["offline", "online"],
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
