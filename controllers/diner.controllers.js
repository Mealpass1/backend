const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const Diner = require("../models/diner.model");

exports.signup = async (req, res) => {
  const data = {
    fullname: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  const { error } = dinerSchema.validate(data);

  if (error) {
    return res.json({
      status: "error",
      message: "invalid credentials",
    });
  } else {
    await Diner.findOne({ email: data.email })
      .then(async (response) => {
        if (response) {
          return res.json({
            status: "error",
            message: "user exists",
          });
        } else {
          await bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return res.json({
                status: "error",
                message: err.message,
              });
            } else {
              bcrypt
                .hash(data.password, `${salt}`)
                .then(async (hashedPassword) => {
                  const diner = new Diner({
                    fullname: data.fullname,
                    email: data.email,
                    username: data.username,
                    password: hashedPassword,
                  });
                  await diner
                    .save()
                    .then((response) => {
                      return res.json({
                        status: "success",
                        message: "diner created",
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
        }
      })
      .catch((err) => {
        return res.json({
          status: "error",
          message: err.message,
        });
      });
  }
};

exports.login = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  await Diner.findOne({ username: data.username }).then((diner) => {
    if (!diner) {
      return res.json({
        status: "error",
        message: "invalid email or password",
      });
    } else {
      bcrypt
        .compare(data.password, diner.password)
        .then((response) => {
          if (!response) {
            return res.json({
              status: "error",
              message: "invalid email or password",
            });
          } else {
            const token = jwt.sign({ id: diner._id }, `${process.env.SECRET}`);
            return res.json({
              status: "success",
              message: "diner logged in",
              data: token,
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

const dinerSchema = joi.object().keys({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
