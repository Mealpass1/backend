const mongoose = require('mongoose');
const dishOrigins= require('../model/dishOrigins');


module.exports.checkDishOriginsExistence = async(dishOrigin)=>{
    const dishOriginExists = await Dishes.findOne({dishOriginName:dishOrigin});
    if(dishOriginExists){
        return true;
    }
    return false;
   }