//packages
const bcrypt = require("bcrypt");

const User = require("../model/user.model");
const { verifyPassword } = require("../utils/verify.password");

//services
module.exports.RegisterUser = async (req) => {
  const user = new User();
  const { fullname, email, username, password } = req;
  const salt = bcrypt.genSalt(10);
  await bcrypt.hash(password, salt).then((hashedPassword) => {
    return new Promise((resolve, _) => {
      user.fullname = fullname;
      user.email = email;
      user.username = username;
      user.password = hashedPassword;
      user.save();
      resolve(user);
    });
  });
};

module.exports.UserLogin = async (req) => {
  const { username, password } = req;
  const user = await User.findOne({ username: username });
  if (!user) return false;
  if (!verifyPassword(password, user.password)) return false;
  return user;
};

module.exports.deleteUser = async (req) => {
  const { id } = req;
  await User.findOneAndRemove({ _id: id }, () => {
    return true;
  });
};

module.exports.getAllUsers = () => {
  const users = User.find();
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

module.exports.getUserById = async (req) => {
  const { id } = req;
  const user = await User.findOne({ _id: id });
  if (user) {
    return new Promise((resolve, _) => {
      resolve(user);
    });
  }
  return;
};

module.exports.updateUser = async (userId, newUser) => {
  const { fullname, email, username } = newUser;
  const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (updatedUser) {
    return new Promise((resolve, _) => {
      resolve(updatedUser);
    });
  }
};
