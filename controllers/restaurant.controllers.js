const joi = require("joi");
const bcrypt = require("bcrypt");

const Restaurant = require("../models/restaurant.model");

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
                  password: data.password,
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

exports.login = (req, res) => {};

const restaurantSchema = joi.object().keys({
  businessName: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  address: joi.string().required(),
});
