//packages
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

//files
const Dish = require("../models/dish.model");
const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");
const Cart = require("../models/cart.model");

exports.createDish = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      discount: req.body.discount,
      category: req.body.category,
      image: req.file.path,
    };

    if (!req.restaurant.dishTypes.includes(data.category)) {
      await Restaurant.findByIdAndUpdate(req.restaurant._id, {
        $push: { dishTypes: data.category },
      });
    }

    const dish = new Dish({
      restaurant: req.restaurant._id,
      name: data.name,
      price: data.price,
      description: data.description,
      discount: data.discount,
      category: data.category,
      image: data.image,
      createdAt: Date.now(),
    });

    await dish
      .save()
      .then(async (response) => {
        await Restaurant.findByIdAndUpdate(req.restaurant._id, {
          $push: { dishes: response._id },
        })
          .then(async (response) => {
            await session.commitTransaction();
            await session.endSession();
          })
          .catch((err) => {
            throw new Error("restaurant not updated");
          });
      })
      .catch((err) => {
        throw new Error("dish not created");
      });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  return res.json({
    status: "success",
    message: "dish created",
  });
};

exports.allDishes = async (req, res) => {
  await Dish.find({ restaurant: req.restaurant._id })
    .then((dishes) => {
      return res.json({
        status: "success",
        message: "all dishes",
        data: dishes,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.oneDish = async (req, res) => {
  await Dish.findById(req.params.id)
    .then((dish) => {
      return res.json({
        status: "success",
        message: "one dish",
        data: dish,
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Dish.findById(req.params.id)
      .then(async (dish) => {
        if (dish?.stats?.unused > 0) {
          throw new Error("dish can't be deleted");
        } else {
          const array = dish?.image?.split("/")[0];
          const name = array[array.length - 1];
          const token = name.split(".")[0];
          cloudinary.uploader
            .destroy(token)
            .then(async (response) => {
              await Dish.findByIdAndRemove(dish?._id, async (err, item) => {
                if (err) {
                  throw new Error("dish not deleted");
                } else {
                  await Cart.deleteMany(
                    { dish: dish?._id },
                    async (err, item) => {
                      if (err) {
                        throw new Error("dish not deleted from carts");
                      } else {
                        await Menu.deleteMany(
                          { dish: dish?._id },
                          async (err, item) => {
                            if (err) {
                              throw new Error("dish not deleted from menus");
                            } else {
                              await session.commitTransaction();
                              await session.endSession();
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            })
            .catch((error) => {
              throw new Error("image not deleted on cloudinary");
            });
        }
      })
      .catch((err) => {
        throw new Error("dish not found");
      });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  return res.json({
    status: "success",
    message: "dish deleted",
  });
};
