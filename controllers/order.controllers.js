const Order = require("../models/order.model");
const Menu = require("../models/menu.model");
const Cart = require("../models/cart.model");
const Dish = require("../models/dish.model");

exports.create = async (req, res) => {
  const data = {
    array: req.body.array,
  };

  try {
    for (let item of data.array) {
      await Cart.findById(item.cart).then(async (cart) => {
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
        await order.save().then(async (response) => {
          const menu = new Menu({
            diner: response.diner,
            order: response._id,
            dish: response.dish,
            restaurant: response.restaurant,
            createdAt: Date.now(),
          });
          await menu.save().then(async (response) => {
            await Dish.findByIdAndUpdate(item.dish, {
              $inc: { "stats.unused": parseInt(cart.mealServing) },
              $inc: { "sales.diners": 1 },
              $inc: { "sales.money": parseInt(cart.subTotal) },
            }).then(async (response) => {
              await Cart.findByIdAndRemove(item.cart);
            });
          });
        });
      });
    }

    return res.json({
      status: "success",
      message: "order was made",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.allOrders = async (req, res) => {
  await Order.find({ restaurant: req.restaurant._id })
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
