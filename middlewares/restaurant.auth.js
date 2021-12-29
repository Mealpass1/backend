const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const Restaurant = require("../models/restaurant.model");

const auth = async (req, res, next) => {
  if (!req.headers.auth) {
    return res.json({
      status: "error",
      message: "No authorization specified",
    });
  } else {
    jwt.verify(
      req.headers.auth,
      `${process.env.SECRET}`,
      async (err, decoded) => {
        if (err) {
          return res.json({
            status: "error",
            message: "Not Authorised to this service",
          });
        } else {
          await Restaurant.findOne({ _id: decoded.id }).then((restaurant) => {
            if (!restaurant) {
              return res.json({
                status: "error",
                message: "account doesn't exists",
              });
            } else {
              if (restaurant.status == "offline") {
                return res.json({
                  status: "error",
                  message: "please login to continue",
                });
              } else {
                req.restaurant = restaurant;
                next();
              }
            }
          });
        }
      }
    );
  }
};

module.exports = auth;
