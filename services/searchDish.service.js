const mongoose = require("mongoose");
const Dishes = require("../model/dish.model");

module.exports.dishSearch = async (req) => {
  const { searchQuery } = req;
  const Dishes = require("../model/product.model");
  const results = await Dishes.find(
    {
      dishName: new RegExp(searchQuery, "i"),
    },
    function (err, dishNames) {
      if (err) {
        return false;
      }
      return dishNames;
    }
  );

  if (results) {
    return new Promise((resolve, _) => {
      resolve(results);
    });
  }
};
