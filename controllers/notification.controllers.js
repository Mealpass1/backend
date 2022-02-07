const Diner = require("../models/diner.model");
const Notification = require("../models/notifications.model");

exports.subscribe = async (req, res) => {
  const data = {
    subscription: req.body.subscription,
  };

  await Diner.findOneAndUpdate(
    { _id: req.diner._id },
    {
      pushSubscription: data.subscription,
    }
  )
    .then((response) => {
      return res.json({
        status: "success",
        message: "subscription added",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.notifications = async (req, res) => {
  await Notification.find({ diner: req.diner._id })
    .then((response) => {
      return res.json({
        status: "success",
        message: "all notifications",
        data: response,
      });
    })
    .catch((error) => {
      return res.json({
        status: "error",
        message: error.message,
      });
    });
};

exports.see = async (req, res) => {
  const data = {
    notification: req.body.notification,
  };
  await Notification.findOneAndUpdate(
    { diner: req.diner._id, _id: data.notification },
    {
      seen: true,
    }
  )
    .then((response) => {
      return res.json({
        status: "success",
        message: "seen",
      });
    })
    .catch((error) => {
      return res.json({
        status: "error",
        message: error.message,
      });
    });
};
