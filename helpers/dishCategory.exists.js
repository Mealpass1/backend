const mongoose = require('mongoose');
const dishCategories = require('../model/dishCategories.model');

module.exports.checkDishCategoryExistence = async(category)=>{
    const CategoryExists = await dishCategories.findOne({categoryName:category});
    if(CategoryExists){
        return true;
    }
    return false;
   }