const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const Admin = require("../models/admin.model");

const auth = async (req, res, next) => {
  if (!req.headers.auth) {
    return res.json({
      status: "error",
      message: "No authorization specified",
    });
  } else {
    jwt.verify(
      req.headers.auth,
      `${process.env.ADMINSECRET}`,
      async (err, decoded) => {
        if (err) {
          return res.json({
            status: "error",
            message: "Not Authorised to this service",
          });
        } else {
          await Admin.findOne({ _id: decoded.id }).then((admin) => {
            if (!admin) {
              return res.json({
                status: "error",
                message: "admin doesn't exists",
              });
            } else {
              req.admin = admin;
              next();
            }
          });
        }
      }
    );
  }
};

module.exports = auth;
