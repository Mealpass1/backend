const joi = require("joi");

const Cart = require("../models/cart.model");
const Diner = require("../models/diner.model");

exports.addDish = async (req, res) => {
  const data = {
    quantity: req.body.quantity,
    timeOfMeal: req.body.timeOfMeal,
    daysInWeek: req.body.daysInWeek,
    deliveryMode: req.body.deliveryMode,
    toppings: req.body.toppings,
    price: req.body.price,
  };

  try {
    let toppingsPrice = data.toppings.reduce((total, topping) => {
      return total + topping.price;
    }, 0);

    const { error } = cartSchema.validate(data);

    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    } else {
      const cart = new Cart({
        owner: req.diner._id,
        dish: req.body.dish,
        price: req.body.price,
        restaurant: req.body.restaurant,
        quantity: data.quantity,
        timeOfMeal: data.timeOfMeal,
        daysInWeek: data.daysInWeek,
        deliveryMode: data.deliveryMode,
        toppings: data.toppings,
        mealServing: data.quantity * data.daysInWeek.length,
        createdAt: Date.now(),
        subTotal:
          data.quantity * data.price * data.daysInWeek.length +
          toppingsPrice * data.quantity * data.daysInWeek.length,
      });
      await cart.save().then(() => {
        return res.json({
          status: "success",
          message: "dish added to cart",
        });
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  await Cart.find({ owner: req.diner._id })
    .populate("dish")
    .populate("restaurant")
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
      return res.json({
        status: "success",
        message: "cart item deleted",
      });
    }
  }).clone();
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

  try {
    await Cart.findById(req.params.id).then(async (item) => {
      let toppingsPrice = item.toppings.reduce((total, topping) => {
        return total + topping.price;
      }, 0);

      const subTotal =
        data.mealserving * item.price + toppingsPrice * data.mealserving;

      await Cart.findByIdAndUpdate(req.params.id, {
        mealServing: data.mealserving,
        subTotal: subTotal,
      }).then(() => {
        return res.json({
          status: "success",
          message: "mealserving updated",
        });
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.oneDish = async (req, res) => {
  await Cart.findById(req.params.id)
    .populate("dish")
    .then((item) => {
      return res.json({
        status: "success",
        message: "cart item",
        data: item,
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
  price: joi.number().required(),
  toppings: joi.array().required(),
});
