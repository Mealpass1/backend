//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();

//files
const Dish = require("../models/dish.model");
const Menu = require("../models/menu.model");
const Order = require("../models/order.model");
const Request = require("../models/request.model");
const Notification = require("../models/notifications.model");

exports.create = async (req, res) => {
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
      return res.json({
        status: "error",
        message: "dish doesn't exist",
      });
    } else {
      await Order.findById(data.order).then(async (order) => {
        if (!order) {
          return res.json({
            status: "error",
            message: "order doesn't exist",
          });
        } else {
          await Dish.findByIdAndUpdate(data.dish, {
            $inc: { "stats.used": data.quantity },
            $inc: { "stats.unused": parseInt(-data.quantity) },
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
                    $inc: { "mealServing.used": data.quantity },
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
                    request
                      .save()
                      .then((response) => {
                        const notification = new Notification({
                          restaurant: data.restaurant,
                          title: "Meal request",
                          body: `${req.diner.username} made a meal request`,
                          createdAt: Date.now(),
                        });

                        notification
                          .save()
                          .then((response) => {
                            return res.json({
                              status: "success",
                              message: "request made",
                            });
                          })
                          .catch((err) => {
                            return res.json({
                              status: "error",
                              message: err.message,
                            });
                          });
                      })
                      .catch((err) => {
                        return res.json({
                          status: "error",
                          message: err.message,
                        });
                      });
                  });
                })
                .catch((error) => {
                  return res.json({
                    status: "error",
                    message: error.message,
                  });
                });
            })
            .catch((error) => {
              return res.json({
                status: "error",
                message: error.message,
              });
            });
        }
      });
    }
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
