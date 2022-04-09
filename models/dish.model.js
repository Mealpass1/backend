const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  stats: {
    type: {
      used: {
        type: Number,
        default: 0,
      },
      unused: {
        type: Number,
        default: 0,
      },
    },
  },
  sales: {
    type: {
      diners: {
        type: Number,
        default: 0,
      },
      money: {
        type: Number,
        default: 0,
      },
    },
  },
  toppings: {
    type: [
      {
        name: String,
        price: Number,
      },
    ],
  },
});

module.exports = mongoose.model("Dish", dishSchema);
