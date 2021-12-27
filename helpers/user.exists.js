const Users = require("../model/user.model");

module.exports.checkUserExistence = async (userEmail) => {
  const EmailExists = await Users.findOne({ email: userEmail });
  if (EmailExists) {
    return true;
  }
  return false;
};
