//packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../model/user.model");

//services
const {
  RegisterUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../services/users.service");

//helpers
const { checkUserExistence } = require("../helpers/user.exists");

//configuring dotenv
dotenv.config();

//controllers
module.exports.UserRegistrationController = async (req, res) => {
  const exists = await checkUserExistence(req.body.email);

  if (exists) {
    return res.json({
      status: "error",
      message: "user exists",
    });
  } else {
    await RegisterUser(req.body).then((response) => {
      if (response) {
        return res.json({
          status: "success",
          message: "user created",
        });
      } else {
        return res.json({
          status: "error",
          message: "server error",
        });
      }
    });
  }
};

module.exports.UserLoginController = async (req, res) => {
  await User.find({ username: req.body.username }).then(async ([user]) => {
    if (user) {
      await bcrypt
        .compare(req.body.password, user.password)
        .then((response) => {
          if (response) {
            let accessToken = jwt.sign(
              { id: user._id },
              `${process.env.SECRET}`
            );
            return res.json({
              status: "success",
              message: "Login successful",
              data: accessToken,
            });
          } else {
            return res.json({
              status: "error",
              message: "invalid credentials",
            });
          }
        });
    } else {
      return res.json({
        status: "error",
        message: "invalid credentials",
      });
    }
  });
};

module.exports.deleteUserController = async (req, res) => {
  const deletedUser = await deleteUser(req.params);
  if (deletedUser) {
    return res.json({
      status: "success",
      message: "user deleted",
    });
  } else {
    return res.json({
      status: "error",
      message: "user not deleted",
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  await getAllUsers().then((users) => {
    if (users) {
      return res.json({
        status: "success",
        message: "users",
        data: users,
      });
    } else {
      return res.json({
        status: "error",
        message: "server error",
      });
    }
  });
};

module.exports.getUserById = async (req, res) => {
  await getUserById(req.params).then((user) => {
    if (user) {
      return res.json({
        status: "success",
        message: "user",
        data: user,
      });
    } else {
      return res.json({
        status: "error",
        message: "user not found",
      });
    }
  });
};

module.exports.updateUserController = async (req, res) => {
  await updateUser(req.params.id, req.body).then((updatedUser) => {
    if (updatedUser) {
      return res.json({
        status: "success",
        message: "user updated",
      });
    } else {
      return res.json({
        status: "error",
        message: "Failed to update user",
      });
    }
  });
};
