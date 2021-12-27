const Restaurants = require("../model/restaurants.model");

module.exports.checkRestaurantExistence = async (email) => {
  const emailExists = await Restaurants.findOne({ email: email });
  if (emailExists) {
    return true;
  }
  return false;
};
