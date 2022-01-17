const Dish = require("../models/dish.model");
const Menu = require("../models/menu.model");
const Order = require("../models/order.model");
const Request = require("../models/request.model");

exports.create = async (req, res) => {
  const data = {
    diner: req.body.diner,
    dish: req.body.dish,
    order: req.body.order,
    restaurant: req.body.restaurant,
    status: "pending",
    quantity: 1,
  };

  await Dish.findOneById(data.dish).then(async (dish) => {
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
            $inc: { "stats.used": 1 },
            $inc: { "stats.unused": -1 },
          }).then(async (response) => {
            await Menu.findByIdAndUpdate(data.menu, {
              used: true,
            }).then(async(menu));
          });
        }
      });
    }
  });
};
