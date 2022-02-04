const Diner = require("../models/diner.model");

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
