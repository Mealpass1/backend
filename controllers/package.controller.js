const mongoose = require("mongoose");
const Package = require("../models/package.model");
const Cart = require("../models/admin-cart.model");

exports.create = async (req, res) => {
  const data = {
    name: req.body.name,
    mealServing: req.body.mealServing,
    price: req.body.price,
    dishes: req.body.dishes,
    restaurants: req.body.restaurants,
  };

  const session = await mongoose.startSession();
  session.startTransaction();

  const basket = new Package({
    name: data.name,
    mealServing: data.mealServing,
    restaurants: data.restaurants,
    dishes: data.dishes,
    price: data.price,
  });

  await basket
    .save()
    .then((response) => {
      data.dishes.forEach(async (dish) => {
        await Cart.findByIdAndRemove(dish, async (err, dov) => {
          if (err) {
            await session.commitTransaction();
            await session.endSession();
            return res.json({
              status: "error",
              message: err.message,
            });
          } else {
            await session.commitTransaction();
            await session.endSession();
            return res.json({
              status: "success",
              message: "package created",
            });
          }
        }).clone();
      });
    })
    .catch(async (err) => {
      await session.commitTransaction();
      await session.endSession();
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.packages = async (req, res) => {
  await Package.find({})
    // .populate("restaurants")
    .exec()
    .then((response) => {
      return res.json({
        status: "success",
        message: "all packages",
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

exports.package = async (req, res) => {
  await Package.findOne({ id: req.params._id })
    .then((response) => {
      return res.json({
        status: "success",
        message: "package",
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
