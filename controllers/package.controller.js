const mongoose = require("mongoose");
const Package = require("../models/package.model");
const Cart = require("../models/admin-cart.model");
const PackageItems = require("../models/package-item.model");

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

  try {

    const basket = new Package({
      name: data.name,
      mealServing: data.mealServing,
      restaurants: data.restaurants,
      price: data.price,
      createdAt: Date.now(),
    });

    await basket
      .save()
      .then((response) => {
        const dishes = data.dishes.map(el => ({ ...el, package: response._id }));
        PackageItems.insertMany([...dishes]).then(async (response) => {
          Cart.deleteMany({}).then((response) => {
            return res.json({
              status: "success",
              message: "package created",
            });
          });
        })
          .catch((err) => {
            throw new Error(err.message);
          });
      });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.packages = async (req, res) => {
  await Package.find({})
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
