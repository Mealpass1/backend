const mongoose = require("mongoose");
const dishOrigins = require("../model/dishOrigins");

module.exports.renderDishesOrigins = async () => {
  const origins = dishOrigins.find();
  return new Promise((resolve, _) => {
    resolve(origins);
  });
};

module.exports.createNewDishOrigin = async (req) => {
  const dishOrigin = new dishOrigins();
  const { dishOriginNumber, dishOriginName } = req;
  return new Promise((resolve, _) => {
    dishOrigin.dishOriginNumber = dishOriginNumber;
    dishOrigin.dishOriginName = dishOriginName;
    dishOrigin.save();
    resolve(dishOrigin);
  });
};

module.exports.getDishOriginById = async (req) => {
  const { id } = req;
  const dishOrigin = await dishOrigins.findOne({ _id: id });
  return new Promise((resolve, _) => {
    resolve(dishOrigin);
  });
};

module.exports.deleteDishOrigin = async (req) => {
  const { id } = req;
  const dishOrigins = dishOrigins.deleteOne({ _id: id });
  return new Promise((resolve, _) => {
    resolve(dishOrigins);
  });
};
