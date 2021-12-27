//packages
const bcrypt = require("bcrypt");

const User = require("../model/user.model");

//services
module.exports.RegisterUser = async ({
  fullname,
  email,
  username,
  password,
}) => {
  const user = new User();
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

module.exports.UserLogin = async ({ username, password }) => {
  await User.findOne({ username: username }).then((user) => {
    if (!user) {
      return false;
    } else {
      bcrypt.compare(password, user.password).then((response) => {
        if (!response) {
          return false;
        } else {
          return user;
        }
      });
    }
  });
};

module.exports.deleteUser = async ({ id }) => {
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

module.exports.getUserById = async ({ id }) => {
  const user = await User.findOne({ _id: id });
  if (user) {
    return new Promise((resolve, _) => {
      resolve(user);
    });
  }
  return;
};

module.exports.updateUser = async (userId, newUser) => {
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
