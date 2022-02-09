//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();

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
    await Cart.findById(item.cart)
      .then(async (cart) => {
        const order = new Order({
          diner: req.diner._id,
          restaurant: item.restaurant,
          dish: item.dish,
          quantity: cart.quantity,
          timeOfMeal: cart.timeOfMeal,
          daysInWeek: cart.daysInWeek,
          deliveryMode: cart.deliveryMode,
          repeatsInMonth: cart.repeatsInMonth,
          mealServing: { unused: cart.mealServing },
          createdAt: Date.now(),
        });
        await order
          .save()
          .then(async (order) => {
            const menu = new Menu({
              diner: order.diner,
              order: order._id,
              dish: order.dish,
              restaurant: order.restaurant,
              status: "approved",
              createdAt: Date.now(),
            });
            await menu
              .save()
              .then(async (response) => {
                await Dish.findByIdAndUpdate(
                  item.dish,
                  {
                    $inc: { "stats.unused": +cart.mealServing },
                    $inc: { "sales.diners": +1 },
                    $inc: { "sales.money": +cart.subTotal },
                  },
                  { upsert: true }
                )
                  .then(async (dish) => {
                    await Restaurant.findByIdAndUpdate(dish.restaurant, {
                      $inc: { revenue: cart.subTotal },
                    })
                      .then(async (response) => {
                        await Diner.findByIdAndUpdate(req.diner._id, {
                          $inc: { purchases: +cart.subTotal },
                          $pull: { cart: `${cart._id}` },
                        }).then(async (response) => {
                          await Cart.findByIdAndRemove(item.cart)
                            .then((response) => {
                              const notification = new Notification({
                                diner: req.diner._id,
                                title: "Meal order",
                                body: "Check your 'Menu tab'",
                                createdAt: Date.now(),
                              });

                              notification
                                .save()
                                .then((response) => {
                                  const body = JSON.stringify({
                                    title: "Meal order",
                                    description: "Your meal order is paid",
                                    icon: `${process.env.ICON}`,
                                  });

                                  webPush
                                    .sendNotification(
                                      req.diner.pushSubscription,
                                      body
                                    )
                                    .then(async (response) => {
                                      await Restaurant.findById(
                                        item.restaurant
                                      ).then((restaurant) => {
                                        const body = JSON.stringify({
                                          title: "new meal order",
                                          description: `${req.diner.username} placed new order`,
                                          icon: `${process.env.ICON}`,
                                        });

                                        webPush
                                          .sendNotification(
                                            restaurant.pushSubscription,
                                            body
                                          )
                                          .catch((err) => {
                                            console.log(
                                              "restaurant doesn't have notification subscription"
                                            );
                                          });
                                      });
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
      })
      .catch((error) => {
        return res.json({
          status: "error",
          message: error.message,
        });
      });
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
