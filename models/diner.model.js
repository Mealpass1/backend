const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dinerSchema = new Schema({
  fullname: {
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
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/f-studios/image/upload/v1645706088/mealpass/img_135335_lp1nvc.png",
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
  },
  status: {
    type: String,
    enum: ["online", "offline"],
  },
  purchases: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastLogin: {
    type: Date,
  },
  pushSubscription: {
    type: {},
  },
});

module.exports = mongoose.model("Diner", dinerSchema);
