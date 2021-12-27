//packages
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Restaurant = require("../model/restaurant.model");
const bcrypt = require("bcrypt");

//services
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestrauntById,
  deleteRestaurant,
  updateRestaurant,
  LoginRestaurant,
} = require("../services/restaurants.service");

//helpers
const { checkRestaurantExistence } = require("../helpers/restaurant.exists");

//configure dotenv
dotenv.config();

//controllers
module.exports.createNewRestaurantController = async (req, res) => {
  const exists = await checkRestaurantExistence(req.body.email);
  if (exists) {
    return res.json({
      status: "error",
      message: "restaurant exists",
    });
  } else {
    await createNewRestaurant(req.body).then((restaurant) => {
      return res.json({
        status: "success",
        message: "restaurant created",
      });
    });
  }
};

module.exports.getAllRestaurantsController = async (_, res) => {
  const restraunts = await getAllRestaurants();
  if (restraunts) {
    return res.json({
      status: "success",
      message: "all restuarants",
      data: restraunts,
    });
  } else {
    return res.json({
      status: "error",
      message: "no restaurants found",
    });
  }
};

module.exports.getRestrauntByIdController = async (req, res) => {
  const restraunt = await getRestrauntById(req.params);
  if (restraunt) {
    return res.json({
      status: "success",
      message: "restaurant",
      data: restraunt,
    });
  } else {
    return res.json({
      status: "error",
      message: "no restaurant found",
    });
  }
};

module.exports.deleteRestrauntController = async (req, res) => {
  const response = await deleteRestaurant(req.params);
  if (response) {
    return res``.json({
      status: "success",
      message: "restaurant deleted",
    });
  } else {
    return res.json({
      status: "error",
      message: "no restaurant found",
    });
  }
};

module.exports.updateRestaurantController = async (req, res) => {
  const response = await updateRestaurant(req.params.id, req.body);
  if (response) {
    return res.json({
      status: "success",
      message: "restaurant updated",
    });
  } else {
    return res.json({
      status: "error",
      message: "no restaurant found",
    });
  }
};

module.exports.LoginRestaurantController = async (req, res) => {
  Restaurant.find({ email: req.body.email }).then(([restaurant]) => {
    if (!restaurant) {
      return res.json({
        status: "error",
        message: "invalid email or password",
      });
    } else {
      bcrypt
        .compare(req.body.password, restaurant.password)
        .then((response) => {
          if (response) {
            let token = jwt.sign(
              { id: restaurant._id },
              `${process.env.SECRET}`
            );
            return res.json({
              status: "success",
              message: "restaurant logged in",
              data: token,
            });
          } else {
            return res.json({
              status: "error",
              message: "invalid email or password",
            });
          }
        });
    }
  });
};
