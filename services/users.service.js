const mongoose = require("mongoose")
const Users = require('../')
const { hashFunction } = require("../utils/hashFunction")
const { verifyPassword } = require("../utils/verify.password")
module.exports.RegisterUser = async (req) => {
  const user = new Users()
  const { fullname, email, username, password } = req
  const hashedPassword = await hashFunction(password)
  return new Promise((resolve, _) => {
    user.fullname = fullname
    user.email = email
    user.username = username
    user.password = hashedPassword
    user.save()
    resolve(user)
  })
}

module.exports.UserLogin = async (req) => {
  const { username, password } = req
  const user = await Users.findOne({ username: username })
  if (!user) return false
  if (!verifyPassword(password, user.password)) return false
  return user
}

module.exports.deleteUser = async (req) => {
  const { id } = req
  const user = await Users.deleteOne({ _id: id })
  if (!user) {
    return false
  }
  return user
}

module.exports.getAllUsers = () => {
  const users = Users.find()
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}

module.exports.getUserById = async (req) => {
  const { id } = req
  const user = await Users.findOne({ _id: id })
  if (user) {
    return new Promise((resolve, _) => {
      resolve(user)
    })
  }
  return
}

module.exports.updateUser = async (userId, newUser) => {
  const { fullname, email, username } = newUser
  const updatedUser = await Users.findByIdAndUpdate(userId, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  if (updatedUser) {
    return new Promise((resolve, _) => {
      resolve(updatedUser)
    })
  }
}
