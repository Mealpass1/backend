const Diner = require("../models/diner.model");

exports.subscribe = async (req, res) => {
  const data = {
    subscription: req.body.subscription,
  };

  const phone = req.diner.pushSubscription.filter((phone) => {
    return phone == data.subscription;
  });

  if (phone.length == 0) {
    await Diner.findOneAndUpdate(
      { _id: req.diner._id },
      {
        $push: { pushSubscription: data.subscription },
      }
    )
      .then((response) => {
        return res.json({
          status: "success",
          message: "phone registered for notifications",
        });
      })
      .catch((err) => {
        return res.json({
          status: "error",
          message: err.message,
        });
      });
  } else {
    return res.json({
      status: "success",
      message: "phone already registered for notifications",
    });
  }
};
