const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
  business_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    required: false,
  },
  imgUrl: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/dnfeo5ce9/image/upload/v1637226911/default_ula86a.jpg",
  },
  description: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Restaurant", restaurantsSchema);
