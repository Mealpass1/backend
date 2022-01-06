const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Restaurant = require("../models/restaurant.model");
const Dish = require("../models/dish.model");

exports.signup = async (req, res) => {
  const data = {
    businessName: req.body.businessName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
  };

  const { error } = restaurantSchema.validate(data);

  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  } else {
    await Restaurant.findOne({ email: data.email }).then((response) => {
      if (response) {
        return res.json({
          status: "error",
          message: "restaurant already exists",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.json({
              status: "error",
              message: err.message,
            });
          } else {
            bcrypt
              .hash(data.password, salt)
              .then(async (hashedPassword) => {
                const restaurant = new Restaurant({
                  businessName: data.businessName,
                  email: data.email,
                  username: data.username,
                  password: hashedPassword,
                  address: data.address,
                  createdAt: Date.now(),
                });
                await restaurant
                  .save()
                  .then((response) => {
                    return res.json({
                      status: "success",
                      message: "restaurant created",
                    });
                  })
                  .catch((err) => {
                    return res.json({
                      status: "error",
                      message: "restaurant already exists",
                    });
                  });
              })
              .catch((err) => {
                return res.json({
                  status: "error",
                  message: "restaurant already exists",
                });
              });
          }
        });
      }
    });
  }
};

exports.login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  await Restaurant.findOne({ email: data.email }).then((restaurant) => {
    if (!restaurant) {
      return res.json({
        status: "error",
        message: "invalid email or password",
      });
    } else {
      bcrypt
        .compare(data.password, restaurant.password)
        .then((response) => {
          if (!response) {
            return res.json({
              status: "error",
              message: "invalid email or password",
            });
          } else {
            Restaurant.findOneAndUpdate(
              { _id: restaurant._id },
              {
                status: "online",
                lastLogin: Date.now(),
              }
            )
              .then((response) => {
                const token = jwt.sign(
                  { id: restaurant._id },
                  `${process.env.SECRET}`
                );
                return res.json({
                  status: "success",
                  message: "restaurant logged in",
                  data: token,
                });
              })
              .catch((err) => {
                return res.json({
                  status: "error",
                  message: err.message,
                });
              });
          }
        })
        .catch((err) => {
          return res.json({
            status: "error",
            message: err.message,
          });
        });
    }
  });
};

exports.logout = async (req, res) => {
  await Restaurant.findByIdAndUpdate(req.restaurant._id, {
    status: "offline",
  })
    .then((response) => {
      return res.json({
        status: "success",
        message: "restaurant logged out",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.allRestaurants = async (req, res) => {
  await Restaurant.find({})
    .populate("dishes")
    .then((restaurants) => {
      return res.json({
        status: "success",
        message: "all restaurants",
        data: restaurants,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.oneRestaurant = async (req, res) => {
  await Restaurant.findById(req.params.id)
    .populate("dishes")
    .then((restaurant) => {
      return res.json({
        status: "success",
        message: "one restaurant",
        data: restaurant,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.update = async (req, res) => {
  const data = {
    businessName: req.body.businessName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description,
  };
  Restaurant.findByIdAndUpdate(req.restaurant._id, {
    businessName: data.businessName,
    email: data.email,
    username: data.username,
    password: data.password,
    address: data.address,
    phone: data.phone,
    description: data.description,
  })
    .then((result) => {
      return res.json({
        status: "success",
        message: "updated",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

const restaurantSchema = joi.object().keys({
  businessName: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  address: joi.string().required(),
});
