const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  dishId: {
    type: mongoose.Types.ObjectId,
    ref: "dish",
  },
  userId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  timeOfMeal: {
    type: String,
    required: true,
  },
  createdAt: Date,
  daysInWeek: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
  ],
  NumberOfRepetition: {
    type: String,
    required: true,
  },
  mealServing: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
