const Menu = require("../models/menu.model");
const Diner = require("../models/diner.model");
const Order = require("../models/order.model");

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

  const email = await Diner.findOne({ email: data.person });
  const username = await Diner.findOne({ username: data.person });

  if (email) {
    selected = "email";
  } else if (username) {
    selected = "username";
  } else {
    return res.json({
      status: "error",
      message: "user not found",
    });
  }

  await Order.findOne({ _id: data.order })
    .then(async (response) => {
      if (response.mealServing.unused > data.quantity) {
        const menu = new Menu({
          inviter: req.diner._id,
          diner: email?._id || username?._id,
          order: data.order,
          dish: data.dish,
          restaurant: data.restaurant,
          createdAt: Date.now(),
        });

        await menu
          .save()
          .then((response) => {
            Order.findOneAndUpdate(
              { _id: data.order },
              {
                $inc: { "mealServing.used": data.quantity },
                $inc: { "mealServing.unused": -data.quantity },
              }
            )
              .then((response) => {
                Menu.findOneAndUpdate(
                  { diner: req.diner._id },
                  {
                    shared: true,
                    $push: {
                      sharing: {
                        date: Date.now(),
                        to: email?._id || username?._id,
                        quantity: data.quantity,
                      },
                    },
                  }
                )
                  .then((response) => {
                    return res.json({
                      status: "success",
                      message: "Meal shared",
                    });
                  })
                  .catch((error) => {
                    return res.json({
                      status: "error",
                      message: error.message,
                    });
                  });
              })
              .catch((err) => {
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
      } else {
        return res.json({
          status: "error",
          message: "Invalid mealServing quantity",
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: "order not found",
      });
    });
};
