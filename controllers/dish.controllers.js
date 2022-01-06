const Dish = require("../models/dish.model");
const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");
const Cart = require("../models/cart.model");

const cloudinary = require("cloudinary").v2;

exports.createDish = async (req, res) => {
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
        .then((response) => {
          return res.json({
            status: "success",
            message: "dish created",
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
  await Dish.findById(req.params.id)
    .then(async (dish) => {
      if (dish?.stats?.unused > 0) {
        return res.json({
          status: "error",
          message: "dish can't be deleted",
        });
      } else {
        await Dish.findByIdAndRemove(dish?._id, async (err, item) => {
          if (err) {
            return res.json({
              status: "error",
              message: err.message,
            });
          } else {
            cloudinary.uploader.destroy(dish?.image?.split(".")[0]);
            await Cart.findOneAndRemove(
              { dish: dish?._id },
              async (err, item) => {
                if (err) {
                  return res.json({
                    status: "error",
                    message: err.message,
                  });
                } else {
                  await Menu.findOneAndRemove(
                    { dish: dish?._id },
                    async (err, item) => {
                      if (err) {
                        return res.json({
                          status: "error",
                          message: err.message,
                        });
                      } else {
                        return res.json({
                          status: "success",
                          message: "Dish deleted",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
