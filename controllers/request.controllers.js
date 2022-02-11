//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//files
const Dish = require("../models/dish.model");
const Menu = require("../models/menu.model");
const Order = require("../models/order.model");
const Request = require("../models/request.model");
const Restaurant = require("../models/restaurant.model");
const Notification = require("../models/notifications.model");

exports.create = async (req, res) => {
  const session = mongoose.startSession();
  await session.startTransaction();

  try {
    const data = {
      diner: req.body.diner,
      dish: req.body.dish,
      order: req.body.order,
      restaurant: req.body.restaurant,
      menu: req.body.menu,
      status: "pending",
      quantity: 1,
    };

    await Dish.findById(data.dish).then(async (dish) => {
      if (!dish) {
        throw new Error("dish not found");
      } else {
        await Order.findById(data.order).then(async (order) => {
          if (!order) {
            throw new Error("error not found");
          } else {
            await Dish.findByIdAndUpdate(data.dish, {
              $inc: { "stats.used": +data.quantity },
              $inc: { "stats.unused": -data.quantity },
            })
              .then(async (response) => {
                await Menu.findByIdAndUpdate(data.menu, {
                  $push: {
                    usage: {
                      date: Date.now(),
                      quantity: data.quantity,
                      status: "pending",
                    },
                  },
                })
                  .then(async (response) => {
                    Order.findByIdAndUpdate(data.order, {
                      $inc: { "mealServing.used": +data.quantity },
                      $inc: { "mealServing.unused": parseInt(-data.quantity) },
                    }).then(async (response) => {
                      const request = new Request({
                        diner: data.diner,
                        dish: data.dish,
                        order: data.order,
                        restaurant: data.restaurant,
                        status: data.status,
                        quantity: data.quantity,
                        createdAt: Date.now(),
                      });
                      request.save().then((response) => {
                        await Restaurant.findById(data.restaurant)
                          .then((restaurant) => {
                            const body = JSON.stringify({
                              title: "New meal request",
                              description: `${req.diner.username} made a meal request`,
                              icon: `${process.env.ICON}`,
                            });

                            webPush
                              .sendNotification(
                                restaurant.pushSubscription,
                                body
                              )
                              .then(async (response) => {
                                const notification = new Notification({
                                  restaurant: data.restaurant,
                                  title: "Meal request",
                                  body: `${req.diner.username} made a meal request`,
                                  createdAt: Date.now(),
                                });

                                notification
                                  .save()
                                  .then(async (response) => {
                                    await session.commitTransaction();
                                    await session.endSession();
                                  })
                                  .catch((err) => {
                                    return res.json({
                                      status: "error",
                                      message: err.message,
                                    });
                                  });
                              })
                              .catch((err) => {
                                throw new Error("notification not sent");
                              });

                            return res.json({
                              status: "success",
                              message: "request made",
                            });
                          })
                          .catch((err) => {
                            throw new Error("restaurant not found");
                          });
                      });
                      throw new Error("request not saved");
                    });
                  })
                  .catch((error) => {
                    throw new Error("menu not updated");
                  });
              })
              .catch((error) => {
                throw new Error("dish not updated");
              });
          }
        });
      }
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
    status: "success",
    message: "request sent",
  });
};

exports.allRequests = async (req, res) => {
  await Request.find({ restaurant: req.restaurant._id })
    .populate("dish")
    .populate("order")
    .populate("diner")
    .then((requests) => {
      return res.json({
        status: "success",
        message: "All requests",
        data: requests,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
