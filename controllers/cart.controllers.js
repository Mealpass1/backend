const joi = require("joi");

const Cart = require("../models/cart.model");

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
        type: "dish",
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
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  await Cart.find({ owner: req.diner._id })
    .populate("dish")
    .populate("restaurant")
    .populate("package")
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
    amount: req.body.amount,
    timeOfMeal: req.body.timeOfMeal,
    daysInWeek: req.body.daysInWeek,
    deliveryMode: req.body.deliveryMode,
    toppings: req.body.toppings,
  };

  try {
    await Cart.findById(req.params.id).then(async (item) => {
      let toppingsPrice = data.toppings.reduce((total, topping) => {
        return total + topping.price;
      }, 0);

      const mealServing = data.amount * data.daysInWeek.length;

      const subTotal = mealServing * item.price + toppingsPrice * mealServing;

      await Cart.findByIdAndUpdate(req.params.id, {
        quantity: data.amount,
        mealServing: mealServing,
        timeOfMeal: data.timeOfMeal,
        daysInWeek: data.daysInWeek,
        deliveryMode: data.deliveryMode,
        toppings: data.toppings,
        subTotal: subTotal,
      }).then(() => {
        return res.json({
          status: "success",
          message: "item updated",
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

exports.package = async (req, res) => {
  const data = {
    owner: req.diner._id,
    dishes: req.body.dishes,
    restaurants: req.body.restaurants,
    package: req.body.package,
    type: "package",
    subTotal: req.body.subTotal,
    mealServing: req.body.mealServing,
  };

  try {
    const package = new Cart({
      package: data.package,
      restaurants: data.restaurants,
      dishes: data.dishes,
      owner: data.owner,
      type: data.type,
      subTotal: data.subTotal,
      mealServing: data.mealServing,
      createdAt: Date.now(),
    });

    package.save().then(() => {
      return res.json({
        status: "success",
        message: "package added to cart",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deletePackage = async (req, res) => {
  const data = {
    package: req.params.package,
  };

  await Cart.findByIdAndRemove(data.package, async (err, item) => {
    if (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    } else {
      return res.json({
        status: "success",
        message: "Cart package deleted",
      });
    }
  }).clone();
};

const cartSchema = joi.object().keys({
  quantity: joi.number().required(),
  timeOfMeal: joi.string().required(),
  daysInWeek: joi.array().required(),
  deliveryMode: joi.string().required(),
  price: joi.number().required(),
  toppings: joi.array().required(),
});
