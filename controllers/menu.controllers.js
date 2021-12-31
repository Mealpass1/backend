const Menu = require("../models/menu.model");

exports.getMenu = async (req, res) => {
  await Menu.find({ diner: req.diner._id })
    .populate("order", "dish")
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
    .populate("order", "dish")
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
