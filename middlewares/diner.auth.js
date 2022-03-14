const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const Diner = require("../models/diner.model");

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
          await Diner.findOne({ _id: decoded.id }).then((diner) => {
            if (!diner) {
              return res.json({
                status: "error",
                message: "account doesn't exists",
              });
            } else {
              if (diner.status == "offline") {
                return res.json({
                  status: "error",
                  message: "please login to continue",
                });
              } else {
                req.diner = diner;
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
