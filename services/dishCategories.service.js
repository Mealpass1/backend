const mongoose = require("mongoose");
const dishCategories = require("../model/dishCategories.model");

module.exports.renderDishesCategories = async () => {
  console.log('Eeeeeeeeeeeeeeeeeeee');
  const result = await dishCategories.find();
  console.log(result);
  return result;
};

module.exports.createNewDishCategory = async (req) => {
  const dishCategory = new dishCategories();
  const { categoryNumber,categoryName, categoryDescription } = req;
    dishCategory.categoryNumber = categoryNumber;
    dishCategory.categoryName = categoryName;
    dishCategory.categoryDescription = categoryDescription;
    dishCategory.save();
    return dishCategory;
};

module.exports.getDishCategoryById = async (req) => {
  const { id } = req;
  const dishCategory = await dishCategories.findOne({ _id: id });
  return dishCategory;
}

module.exports.deleteDishCategory = async (req) => {
  const { id } = req;
  const dishCategories = dishCategories.deleteOne({ _id: id });
  return new Promise((resolve, _) => {
    resolve(dishCategories);
  });
};
