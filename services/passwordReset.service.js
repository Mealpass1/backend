const JWT = require("jsonwebtoken");
const Users = require("../model/users.model");
const Token = require("../model/token.model");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { hashFunction } = require("../utils/hashFunction");

module.exports.requestPasswordReset = async (email) => {
  const user = await Users.findOne({ email: email });
  if (!user) {
    console.log("user does not exist");
  }
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = hashFunction(resetToken);
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  });
  const link = `passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.fullname, link: link },
    "./template/requestResetPassword.handlebars"
  );
  return link;
};
