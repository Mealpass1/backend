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
    type: [{
      name: {
        type: String,
      },
      id: {
        type: mongoose.Types.ObjectId, ref: "Restaurant"
      }
    }],
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/f-studios/image/upload/v1647729275/mealpass/subscription-beef-box-1-meatme_dcee3664-567e-42a4-a870-df5fce4e5c05_mtdf2k.png",
  },
  revenue: {
    type: Number,
    default: 0,
  },
  dishes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Package", packageSchema);
