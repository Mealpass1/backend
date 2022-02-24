//packages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//files
const Admin = require("../models/admin.model");

const sendEmail = require("../services/admin-email.service");

exports.signup = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    names: req.body.names,
  };

  bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    } else {
      await bcrypt
        .hash(data.password, salt)
        .then(async (hashedPassword) => {
          const admin = new Admin({
            email: data.email,
            password: hashedPassword,
            names: data.names,
          });

          await admin
            .save()
            .then((response) => {
              sendEmail(data.email, data.names);
              return res.json({
                status: "success",
                message: "admin created",
              });
            })
            .catch((err) => {
              return res.json({
                status: "error",
                message: err.message,
              });
            });
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
exports.login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  await Admin.findOne({ email: data.email })
    .then(async (admin) => {
      if (!admin) {
        return res.json({
          status: "error",
          message: "no admin",
        });
      } else {
        await bcrypt
          .compare(data.password, admin.password)
          .then(async (response) => {
            if (!response) {
              return res.json({
                status: "error",
                message: "invalid email or password",
              });
            } else {
              const token = jwt.sign(
                { id: admin._id },
                `${process.env.ADMINSECRET}`
              );

              return res.json({
                status: "success",
                message: "welcome abroad",
                data: token,
              });
            }
          });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.getAdmin = async (req, res) => {
  await Admin.findOne({ _id: req.admin._id })
    .then((response) => {
      return res.json({
        status: "success",
        message: "admin",
        data: response,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
