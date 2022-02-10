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
        .then(async (cart) => {
          if (cart) {
            const order = new Order({
              diner: req.diner._id,
              restaurant: item.restaurant,
              dish: item.dish,
              quantity: cart.quantity,
              timeOfMeal: cart.timeOfMeal,
              daysInWeek: cart.daysInWeek,
              deliveryMode: cart.deliveryMode,
              repeatsInMonth: cart.repeatsInMonth,
              mealServing: {
                used: 0,
                unused: cart.mealServing,
              },
              createdAt: Date.now(),
            });

            await order
              .save()
              .then(async (order) => {
                const menu = new Menu({
                  diner: req.diner._id,
                  order: order._id,
                  dish: item.dish,
                  restaurant: item.restaurant,
                  status: "pending",
                  createdAt: Date.now(),
                });

                await menu
                  .save()
                  .then(async (menu) => {
                    await Dish.findOneAndUpdate(
                      { _id: item.dish },
                      {
                        $inc: { "sales.diners": +1 },
                        $inc: { "sales.money": +cart.subTotal },
                      }
                    )
                      .then(async (response) => {
                        await Restaurant.findOneAndUpdate(
                          { _id: item.restaurant },
                          {
                            $inc: { revenue: +cart.subTotal },
                          }
                        )
                          .then(async (response) => {
                            await Diner.findOneAndUpdate(
                              { _id: req.diner._id },
                              {
                                $inc: { purchases: +cart.subTotal },
                                $pull: { cart: item.cart },
                              }
                            )
                              .then(async (response) => {
                                await Restaurant.findById(item.restaurant)
                                  .then((restaurant) => {
                                    const dinerBody = JSON.stringify({
                                      title: "Order paid",
                                      description: `Your Order was sent to ${restaurant.businessName} restaurant`,
                                      icon: `${process.env.ICON}`,
                                    });

                                    const restaurantBody = JSON.stringify({
                                      title: "New Order",
                                      description: `${req.diner.username} placed a new order`,
                                      icon: `${process.env.ICON}`,
                                    });

                                    webPush
                                      .sendNotification(
                                        restaurant.pushSubscription,
                                        restaurantBody
                                      )
                                      .catch((err) => {
                                        throw new Error(
                                          "restaurant notification not sent"
                                        );
                                      });

                                    webPush
                                      .sendNotification(
                                        req.diner.pushSubscription,
                                        dinerBody
                                      )
                                      .catch((err) => {
                                        throw new Error(
                                          "restaurant notification not sent"
                                        );
                                      });

                                    session.commitTransaction();
                                    session.endSession();
                                  })
                                  .catch((error) => {
                                    throw new Error("restaurant not found");
                                  });
                              })
                              .catch((err) => {
                                throw new Error("diner not updated");
                              });
                          })
                          .catch((err) => {
                            throw new Error("restaurant not updated");
                          });
                      })
                      .catch((err) => {
                        throw new Error("dish not updated");
                      });
                  })
                  .catch((err) => {
                    throw new Error("menu not created");
                  });
              })
              .catch((err) => {
                throw new Error("order not saved");
              });
          } else {
            throw new Error("item not found in cart");
          }
        })
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
