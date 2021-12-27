const mongoose = require("mongoose");
const Restaurants = require("../model/restaurants.model");
const { hashFunction } = require("../utils/hashFunction");
const { verifyPassword } = require("../utils/verify.password");

module.exports.createNewRestaurant = async (restaurant) => {
  const restaurants = new Restaurants();
  const { Business_name, Email, Username, Password, Office_address } =
    restaurant;
  const hashedPassword = await hashFunction(Password);
  restaurants.Business_name = Business_name;
  restaurants.Email = Email;
  restaurants.Username = Username;
  restaurants.Password = hashedPassword;
  restaurants.Office_address = Office_address;
  // restaurants.restaurant_desc = restaurant_desc;
  // restaurants.imgUrl = image.path
  restaurants.save();
  // console.log(restaurants)
  return restaurants;
};

module.exports.getAllRestaurants = async () => {
  const restaurants = await Restaurants.find();
  let data = [];
  for (resto of restaurants) {
    let restData = {
      id: resto._id,
      business_name: resto.Business_name,
      address: resto.Office_address,
      imageUrl: resto.imgUrl,
      desc: resto.restaurant_desc,
    };
    data.push(restData);
  }
  return data;
};

module.exports.getRestrauntById = async (req) => {
  const { id } = req;
  const restraunt = await Restaurants.findOne({ _id: id });
  let restData = {
    id: restraunt._id,
    business_name: restraunt.Business_name,
    address: restraunt.Office_address,
    imageUrl: restraunt.imgUrl,
    desc: restraunt.restaurant_desc,
  };
  console.log(restData);
  return restData;
};

module.exports.deleteRestaurant = async (req) => {
  const { id } = req;
  const results = await Restaurants.deleteOne({ _id: id });
  if (results) {
    return new Promise((resolve, _) => {
      resolve(results);
    });
  }
};

module.exports.updateRestaurant = async (restraunt_id, newRestraunt) => {
  const { Business_name, Email, Username, Office_address } = newRestraunt;
  const updatedRestraunt = await Restaurants.findByIdAndUpdate(
    restraunt_id,
    newRestraunt,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (updatedRestraunt) {
    return new Promise((resolve, _) => {
      resolve(updatedRestraunt);
    });
  }
};

module.exports.LoginRestaurant = async (req) => {
  const { Email, Password } = req;
  const restaurant = await Restaurants.findOne({ Email: Email });
  if (!restaurant) return false;
  if (!verifyPassword(Password, restaurant.Password)) return false;
  return restaurant;
};

module.exports.restaurantProfile = async (restraunt_id, newRestraunt) => {
  const updatedRestraunt = await Restaurants.findByIdAndUpdate(
    restraunt_id,
    newRestraunt,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (updatedRestraunt) {
    return new Promise((resolve, _) => {
      resolve(updatedRestraunt);
    });
  }
};
