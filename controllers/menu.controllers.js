//libraries
const webPush = require("web-push");
const dotenv = require("dotenv").config();

//models
const Menu = require("../models/menu.model");
const Diner = require("../models/diner.model");
const Order = require("../models/order.model");
const Notification = require("../models/notifications.model");

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
    .then(async (order) => {
      if (order.mealServing.unused > data.quantity) {
        const menu = new Menu({
          invite: {
            from: req.diner.username,
            quantity: data.quantity,
          },
          diner: email?._id || username?._id,
          order: data.order,
          dish: data.dish,
          restaurant: data.restaurant,
          status: "pending",
          createdAt: Date.now(),
        });

        await menu
          .save()
          .then((menu) => {
            const notification = new Notification({
              diner: email?._id || username?._id,
              title: "Meal share",
              body: `@${req.diner.username} invited you to share meal`,
              menu: `${menu._id}`,
              order: `${order._id}`,
              dish: `${data.dish}`,
              createdAt: Date.now(),
            });

            notification
              .save()
              .then((response) => {
                const body = JSON.stringify({
                  title: "Meal Share",
                  description: `${req.diner.username} invites you to share meal`,
                  icon: `${process.env.ICON}`,
                });
                webPush.sendNotification(
                  email?.pushSubscription || username?.pushSubscription,
                  body
                );
                Order.findOneAndUpdate(
                  { _id: data.order },
                  {
                    $inc: { "mealServing.used": +data.quantity },
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
                            to: email?.username || username?.username,
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
