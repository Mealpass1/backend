const mongoose = require('mongoose');
const Dishes = require('../model/dish.model');

module.exports.checkDishExistence = async(dishName)=>{
    const NameExists = await Dishes.findOne({dishName:dishName});
    if(NameExists){
        return true;
    }
    return false;
   }