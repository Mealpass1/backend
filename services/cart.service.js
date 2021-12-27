const Cart = require("../model/Cart.model");
const Dishes = require("../model/dish.model");
const Users = require("../model/user.model");

module.exports.addToCart = async (dishId, dishInfo, userId) => {
  console.log(dishInfo);
  const matching_dish = await Dishes.findById(dishId);
  const dishName = matching_dish.dishName;
  let total_topping_price = 0;
  for (let topping of dishInfo.additionalTopping) {
    total_topping_price = total_topping_price + topping.toppingPrice;
  }
  if (matching_dish) {
    const cart = new Cart();
    let imgUrl = await matching_dish.imageUrl;

    const DishInCart = await Cart.findOne({ dishId: dishId });

    if (!DishInCart) {
      cart.dishId = dishId;
      cart.dishName = dishName;
      cart.quantity = dishInfo.quantity;
      cart.price = matching_dish.dishPrice;
      cart.total =
        dishInfo.quantity * matching_dish.dishPrice + total_topping_price;
      cart.imgUrl = imgUrl;
      cart.userId = userId;
      cart.timeOfMeal = dishInfo.timeOfMeal;
      cart.daysInWeek = dishInfo.daysInWeek;
      cart.NumberOfRepetition = dishInfo.NumberOfRepetition;
      cart.additionalTopping = dishInfo.additionalTopping;
      cart.save();
      return cart;
    }
    let price = matching_dish.dishPrice;
    const new_quantity = dishInfo.quantity;
    const total = matching_dish.dishPrice * new_quantity;
    await Cart.findOneAndUpdate(
      { dishId: dishId },
      {
        price: price,
        quantity: new_quantity,
        total: total,
      },
      { useFindAndModify: false }
    );
    return await Cart.findOne({ dishId: dishId });
  }
};

module.exports.getCartDishes = async () => {
  const cart_dishes = Cart.find();
  if (!cart_dishes) {
    return json({
      status: false,
      msg: "There is nothing in cart",
    });
  }
  return cart_dishes;
};

module.exports.deleteCart = async (req) => {
  const { id } = req;
  const carts = await Cart.deleteOne({ _id: id });
  if (!carts) return false;
  return true;
};

module.exports.editCart = async (cartId, newCart, userId) => {
  const responses = {
    LoginError: "invalid credentials",
    NotFoundError: "Cart Not Found",
    updateFailure: "Faile To Update Cart",
  };
  const cart = await Cart.findOne({ userId: userId });
  if (cart) {
    if (cart._id == cartId) {
      const { timeOfMeal, daysInWeek, NumberOfRepetition, additionalTopping } =
        newCart;
      const updatedCart = await Cart.findByIdAndUpdate(cartId, newCart, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      if (updatedCart) {
        return updatedCart;
      }
      return responses.updateFailure;
    }
    return responses.NotFoundError;
  }
  return responses.LoginError;
};

module.exports.getCartDishesById = async (user_id) => {
  try {
    const carts = await Cart.find({ userId: user_id });
    if (carts) {
      return carts;
    }
    return false;
  } catch (err) {
    return err;
  }
};

module.exports.getCartDishById = async (dishId, userId) => {
  // const user = await Cart.findOne({userId:userId});
  const dish = await Cart.findOne({ dishId: dishId, userId: userId });
  if (dish) {
    return dish;
  }
  return false;
};
// editing cart
// checking cart
