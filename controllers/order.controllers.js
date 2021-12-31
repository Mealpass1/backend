const Order = require("../models/order.model");
const Menu = require("../models/menu.model");
const Cart = require("../models/cart.model");

exports.create = async (req, res) => {
  const data = {
    restaurant: req.body.restaurant,
    array: req.body.array,
  };

  try {
    for (let item of data.array) {
      await Cart.findById(item.cart).then(async (cart) => {
        const order = new Order({
          diner: req.diner._id,
          restaurant: data.restaurant,
          dish: item.dish,
          quantity: cart.quantity,
          timeOfMeal: cart.timeOfMeal,
          daysInWeek: cart.daysInWeek,
          deliveryMode: cart.deliveryMode,
          repeatesInMonth: cart.repeatesInMonth,
          mealServing: cart.mealServing,
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
          await menu.save();
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
