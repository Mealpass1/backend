const joi = require("joi");

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
      }
    });
  }
};

const restaurantSchema = joi.object().keys({
  businessName: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  address: joi.string().required(),
});
