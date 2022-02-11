//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//models
const Menu = require("../models/menu.model");
const Diner = require("../models/diner.model");
const Order = require("../models/order.model");
const Notification = require("../models/notifications.model");

exports.getMenu = async (req, res) => {
  await Menu.find({ diner: req.diner._id })
    .populate("order")
    .populate("dish")
    .populate("diner")
    .populate("restaurant")
    .then((menu) => {
      return res.json({
        status: "success",
        message: "Menu",
        data: menu,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOrder = async (req, res) => {
  await Menu.findById(req.params.id)
    .populate("order")
    .populate("dish")
    .populate("restaurant")
    .then((order) => {
      return res.json({
        status: "success",
        message: "Menu item",
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

exports.shareOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = {
      person: req.body.person,
      quantity: req.body.quantity,
      order: req.body.order,
      dish: req.body.dish,
      restaurant: req.body.restaurant,
    };

    let selected = "";

    const email = await Diner.findOne({ email: data.person });
    const username = await Diner.findOne({ username: data.person });

    if (email) {
      selected = "email";
    } else if (username) {
      selected = "username";
    } else {
      throw new Error("user not found");
    }

    await Order.findOne({ _id: data.order })
      .then(async (order) => {
        if (order.mealServing.unused > data.quantity) {
          const body = JSON.stringify({
            title: "Meal Share",
            description: `${req.diner.username} invites you to share meal`,
            icon: `${process.env.ICON}`,
          });
          webPush
            .sendNotification(
              email?.pushSubscription || username?.pushSubscription,
              body
            )
            .then(async (response) => {
              const notification = new Notification({
                diner: email?._id || username?._id,
                title: "Meal share",
                body: `@${req.diner.username} invited you to share meal`,
                menu: `${menu._id}`,
                order: `${order._id}`,
                dish: `${data.dish}`,
                createdAt: Date.now(),
              });

              notification
                .save()
                .then(async (response) => {
                  await session.commitTransaction();
                  await session.endSession();
                })
                .catch((error) => {
                  throw new Error("notification not saved");
                });
            })
            .catch((err) => {
              throw new Error("notification not sent");
            });
        } else {
          throw new Error("invalid mealserving quantity");
        }
      })
      .catch((err) => {
        throw new Error("order not found");
      });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  return res.json({
    status: "succcess",
    message: "order shared",
  });
};
