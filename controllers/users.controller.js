//packages
const jwt = require("jsonwebtoken");
var refreshToken = require("refresh-token");

//services
const {
  RegisterUser,
  UserLogin,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../services/users.service");

//helpers
const { checkUserExistence } = require("../helpers/user.exists");

//controllers
module.exports.UserRegistrationController = async (req, res) => {
  if ((await checkUserExistence(req.body.email)) === true) {
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
  const loggedInUser = await UserLogin(req.body);

  if (loggedInUser) {
    const id = loggedInUser._id;
    let payload = { id };
    let accessToken = jwt.sign(payload, "swsh23hjddnns", {
      algorithm: "HS256",
      expiresIn: 86400,
    });
    res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
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
  const users = await getAllUsers();
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
};

module.exports.getUserById = async (req, res) => {
  await getUserById(req.params).then((response) => {
    if (response) {
      return res.json({
        status: "success",
        message: "user",
        data: response,
      });
    }
    return res.json({
      status: "error",
      message: "user not found",
    });
  });
};

module.exports.updateUserController = async (req, res) => {
  await updateUser(req.params.id, req.body).then((response) => {
    if (response) {
      return res.json({
        status: "success",
        message: "user updated",
      });
    }
    return res.json({
      status: "error",
      message: "Failed to update user",
    });
  });
};
