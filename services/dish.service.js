const mongoose = require("mongoose");
const Dishes = require("../model/dish.model");
const Restaurants = require("../model/restaurant.model");
const _ = require("lodash");
module.exports.createNewDish = async (dishDetails, dishImage, owner) => {
  try {
    const status = dishDetails.discountStatus;
    let price = dishDetails.dishPrice;
    const discount = dishDetails.discountValue;
    // const categories = await dishCategories.find({
    //   categoryNumber: dishDetails.dishCategory,
    // });
    if (status == "on") {
      price = price * discount;
    }
    if (dishImage && dishImage.path) {
      const dish = new Dishes({
        dishDescription: dishDetails.dishDescription,
        imageUrl: dishImage.path,
        dishName: dishDetails.dishName,
        dishCategory: dishDetails.dishCategory,
        // dishOrigin: dishDetails.dishOrigin,
        dishPrice: price,
        restaurant_id: owner,
        additionalTopping: dishDetails.toppings,
        discountStatus: dishDetails.discountStatus,
        discountValue: dishDetails.discountValue,
      });
      await dish.save();
      return dish;
    }
    console.log(dishImage);
    return null;
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllDishes = async () => {
  // let restos = await Restaurants.find({});
  // let data = [];
  // for (let resto of restos) {
  //   const restoDishes = await Dishes.find();
  //   const restaurant = { details: resto, dishes: restoDishes };
  //   data.push(restaurant);
  // }1
  const data = await Dishes.find();
  return data;
};

module.exports.getDishById = async (req) => {
  const { id } = req;
  const dish = await Dishes.findOne({ _id: id });
  return new Promise((resolve, _) => {
    resolve(dish);
  });
};

module.exports.deleteDish = async (req) => {
  const { id } = req;
  const dishes = Dishes.deleteOne({ _id: id });
  return new Promise((resolve, _) => {
    resolve(dishes);
  });
};

module.exports.getDishByRestaurant = async (restaurantId) => {
  console.log(restaurantId);
  let dishes = await Dishes.find({ restaurant_id: restaurantId });
  // const restraunt = await Restaurants.findOne({ _id: restaurantId });
  // console.log(restraunt);
  // const restrauntData = _.pick(restraunt, [
  //   "_id",
  //   "Business_name",
  //   "Office_address",
  // ]);
  return dishes;
};
