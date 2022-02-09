//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//files
const Order = require("../models/order.model");
const Menu = require("../models/menu.model");
const Cart = require("../models/cart.model");
const Dish = require("../models/dish.model");
const Restaurant = require("../models/restaurant.model");
const Diner = require("../models/diner.model");
const Notification = require("../models/notifications.model");

exports.create = async (req, res) => {
  const data = {
    array: req.body.array,
  };

  for (let item of data.array) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await Cart.find({ _id: item.cart })
        .then(async (cart) => {})
        .catch((err) => {
          await session.abortTransaction();
          session.endSession();
          return res.json({
            status: "error",
            message: err.message,
          });
        });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return res.json({
        status: "error",
        message: err.message,
      });
    }
  }
};

exports.allOrders = async (req, res) => {
  await Order.find({ restaurant: req.restaurant._id })
    .populate("diner")
    .populate("restaurant")
    .populate("dish")
    .then((orders) => {
      return res.json({
        status: "success",
        message: "all orders",
        data: orders,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.oneOrder = async (req, res) => {
  await Order.findById(req.params.id)
    .populate("diner")
    .populate("restaurant")
    .populate("dish")
    .then((order) => {
      return res.json({
        status: "success",
        message: "one order",
        data: order,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
