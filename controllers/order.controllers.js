const Order = require("../models/order.model");

exports.create = async (req, res) => {
  const data = {
    restaurant: req.body.restaurant,
    cart: req.body.cart,
    dish: req.body.dish,
  };
  const order = new Order({
    diner: req.diner._id,
    restaurant: data.restaurant,
    cart: data.cart,
    createAt: Date.now(),
  });

  await order.save().then((response) => {
    return res.json({
      status: "success",
      message: "order made",
    });
  });
};
