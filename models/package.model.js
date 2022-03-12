const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const packageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mealServing: {
    type: Number,
    default: 0,
  },
  restaurants: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Restaurant" }],
    required: true,
  },
  dishes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Dish" }],
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Package", packageSchema);
