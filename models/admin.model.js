const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/f-studios/image/upload/v1645502834/mealpass/img_325798_reiegm.png",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
