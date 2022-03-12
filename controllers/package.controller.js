import Package from "../models/package.model";

exports.create = async (req, res) => {
  const data = {
    name: req.body.name,
    mealServing: req.body.mealServing,
    price: req.body.price,
    dishes: req.body.dishes,
    restaurants: req.body.restaurants,
  };

  const basket = new Package({
    name: data.name,
    mealServing: data.mealServing,
    restaurants: data.restaurants,
    dishes: data.dishes,
    price: data.price,
  });

  await basket
    .save()
    .then((response) => {
      return res.json({
        status: "success",
        message: "package created",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.packages = async (req, res) => {
  await Package.find({})
    .then((response) => {
      return res.json({
        status: "success",
        message: "all packages",
        data: response,
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
  await Package.findOne({ id: req.params._id })
    .then((response) => {
      return res.json({
        status: "success",
        message: "package",
        data: response,
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
