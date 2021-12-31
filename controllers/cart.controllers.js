const joi = require("joi");

const Cart = require("../models/cart.model");
const Diner = require("../models/diner.model");

exports.addDish = async (req, res) => {
  const data = {
    quantity: req.body.quantity,
    timeOfMeal: req.body.timeOfMeal,
    daysInWeek: req.body.daysInWeek,
    deliveryMode: req.body.deliveryMode,
    repeatesInMonth: req.body.repeatesInMonth,
  };

  const { error } = cartSchema.validate(data);

  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  } else {
    const cart = new Cart({
      dish: req.body.dish,
      diner: req.diner._id,
      restaurant: req.body.restaurant,
      quantity: data.quantity,
      timeOfMeal: data.timeOfMeal,
      daysInWeek: data.daysInWeek,
      deliveryMode: data.deliveryMode,
      repeatesInMonth: data.repeatesInMonth,
      mealServing:
        data.quantity * data.daysInWeek.length * data.repeatesInMonth,
    });
    await cart
      .save()
      .then(async (item) => {
        await Diner.findByIdAndUpdate(item.diner, {
          $push: { cart: item._id },
        })
          .then((response) => {
            return res.json({
              status: "success",
              message: "dish added to cart",
            });
          })
          .catch((err) => {
            return res.json({
              status: "error",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res.json({
          status: "error",
          message: err.message,
        });
      });
  }
};

exports.getAll = async (req, res) => {
  await Cart.find({ diner: req.diner._id })
    .populate("dish", "restaurant")
    .then((items) => {
      return res.json({
        status: "success",
        message: "all cart items",
        data: items,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.deleteDish = async (req, res) => {
  await Cart.findByIdAndRemove(req.params.id, async (err, item) => {
    if (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    } else {
      await Diner.findByIdAndUpdate(item.diner, {
        $pull: { cart: item._id },
      })
        .then((response) => {
          return res.json({
            status: "success",
            message: "dish deleted",
          });
        })
        .catch((err) => {
          return res.json({
            status: "error",
            message: err.message,
          });
        });
    }
  });
};

exports.updateDish = async (req, res) => {
  const data = {
    quantity: req.body.quantity,
    timeOfMeal: req.body.timeOfMeal,
    daysInWeek: req.body.daysInWeek,
    deliveryMode: req.body.deliveryMode,
    repeatesInMonth: req.body.repeatesInMonth,
  };
  await Cart.findByIdAndUpdate(req.params.id, {
    quantity: data.quantity,
    timeOfMeal: data.timeOfMeal,
    daysInWeek: data.daysInWeek,
    deliveryMode: data.deliveryMode,
    repeatesInMonth: data.repeatesInMonth,
    mealServing: data.quantity * data.daysInWeek.length * data.repeatesInMonth,
  })
    .then((item) => {
      return res.json({
        status: "success",
        message: "dish updated",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.updateMealServing = async (req, res) => {
  const data = {
    mealserving: req.body.mealserving,
  };
  await Cart.findByIdAndUpdate(req.params.id, {
    mealServing: data.mealserving,
  })
    .then((item) => {
      return res.json({
        status: "success",
        message: "meal serving updated",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

const cartSchema = joi.object().keys({
  quantity: joi.number().required(),
  timeOfMeal: joi.string().required(),
  daysInWeek: joi.array().required(),
  deliveryMode: joi.string().required(),
  repeatesInMonth: joi.number().required(),
});
