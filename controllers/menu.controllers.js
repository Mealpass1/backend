const Menu = require("../models/menu.model");
const Diner = require("../models/diner.model");

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
  const data = {
    person: req.body.person,
    quantity: req.body.quantity,
    order: req.body.order,
    dish: req.body.dish,
    restaurant: req.body.restaurant,
  };

  let selected = "";

  const email = await Diner.find({ email: data.person });
  const username = await Diner.find({ username: data.person });

  if (email.length == 1) {
    selected = "email";
  } else if (username.length == 1) {
    selected = "username";
  } else {
    return res.json({
      status: "error",
      message: "user not found",
    });
  }

  const menu = new Menu({
    inviter: req.diner._id,
  });
};
