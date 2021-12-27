const jwt = require('jsonwebtoken')
var refreshToken = require('refresh-token');

const {RegisterUser,UserLogin,deleteUser,getAllUsers,getUserById,updateUser} = require('../services/users.service');
const {checkUserExistence} = require('../helpers/user.exists');

module.exports.UserRegistrationController = async(req,res)=>{
    if((await checkUserExistence(req.body.email,req.body.username)===true)){
       return res.status(400).json({
            message:"user exists"
        })
    }
    else{
        const registeredUser = await RegisterUser(req.body);
    if(registeredUser){
        return res.status(201).json({
            success: true,
            status:'User created successfully'
        })
    }
    return res.status(500).send({message:"server error"});
    }
}

module.exports.UserLoginController = async(req,res)=>{
    const loggedInUser = await UserLogin(req.body);
 if(loggedInUser){
     const id = loggedInUser._id;
     let payload = {id}
        let accessToken = jwt.sign(payload,"swsh23hjddnns",{
             algorithm: "HS256",
            expiresIn:86400
        })
        res.cookie("jwt",accessToken,{secure:true,httpOnly:true})
      return res.status(200).send({
            token: accessToken,
            message:"Login successful"
        });
 }
 return res.status(300).json({
     message:"invalid credentials",
     status: false
 });
}

module.exports.deleteUserController = async(req,res)=>{
    const deletedUser = await deleteUser(req.params);
    if(deletedUser){
        res.status(200).send({message:"user deleted successfully"});
        return deletedUser;
    }
    else{
        res.status(400).send({message:"user deletion failed!"});
        return;
    }
}


module.exports.getAllUsers = async(req,res)=>{

    const users = await getAllUsers();
    if(users){
        res.status(200).send({
            message:"users",
            data:users
        })
        return users;
    }
    res.status(404).send({
        message:"users not found"
    })
}

module.exports.getUserById = async(req,res)=>{
    const user = await getUserById(req.params);
    if(user){
        return res.status(200).json({
            message:"user",
            data:user
        })
    }
    return res.status(404).json({
        message:"user not found",
    })
}

module.exports.updateUserController = async(req,res)=>{
    const newUser = await updateUser(req.params.id,req.body);
    if(newUser){
        return res.status(200).json({
            message:"user updated successfully",
            data:newUser
        })
    }
    return res.status(400).json({
        message:"Failed to update user",
        data:null
    })
}