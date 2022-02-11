const Diner = require("../models/diner.model");
const Restaurant = require("../models/restaurant.model");
const Notification = require("../models/notifications.model");

exports.dinerSubscribe = async (req, res) => {
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

exports.restaurantSubscribe = async (req, res) => {
  const data = {
    subscription: req.body.subscription,
  };

  await Restaurant.findOneAndUpdate(
    { _id: req.restaurant._id },
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

exports.dinerNotifications = async (req, res) => {
  await Notification.find({ diner: req.diner._id })
    .populate("dish")
    .populate("order")
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

exports.restaurantNotifications = async (req, res) => {
  await Notification.find({ restaurant: req.restaurant._id })
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

exports.dinerSee = async (req, res) => {
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

exports.restaurantSee = async (req, res) => {
  const data = {
    notification: req.body.notification,
  };
  await Notification.findOneAndUpdate(
    { restaurant: req.restaurant._id, _id: data.notification },
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
