const mongoose = require('mongoose');
const Users = require('../model/users.model');

module.exports.checkUserExistence = async(userEmail,username)=>{
 const EmailExists = await Users.findOne({email:userEmail});
 const usernameExists = await Users.findOne({username:username});
 if(EmailExists || usernameExists){
     return true;
 }
 return false;
}