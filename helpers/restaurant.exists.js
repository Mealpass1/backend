const mongoose = require('mongoose');
const Restaurants = require('../model/restaurants.model');


module.exports.checkRestaurantExistence = async(email,businessName,username)=>{
 const usernameExists = await Restaurants.findOne({Username:username});
 const emailExists = await Restaurants.findOne({Email:email});
 const businessnameExists = await Restaurants.findOne({Business_name:businessName});
 if(usernameExists || emailExists || businessnameExists ){
     return true;
 }
 return false;
}