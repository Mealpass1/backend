const {renderDishesOrigins,createNewDishOrigin,getDishOriginById,deleteDishOrigin} = require('../services/dishOrigins.service');
const {checkDishOriginsExistence} = require('../helpers/dishOrigins.exists');

module.exports.dishOriginRegistrationController = async(req,res)=>{
    if((await checkDishOriginsExistence(req.body.category)===true)){
        res.status(400).send({
            message:"origin  exists"
        })
    }
    else{
        const registeredDishOrigin = await createNewDishOrigin(req.body);
        if( registeredDishOrigin){
            res.status(201).send({message:"created"});
            return;
        }
        return res.status(500).send({message:"server error"});
    }
}

module.exports.deleteDishOriginController = async(req,res)=>{
    const deletedDishOrigin = await deleteDishOrigin(req.params);
    if(deletedDishOrigin){
        res.status(200).send({message:"dish origin deleted successfully"});
        return  deletedDishOrigin;
    }
    else{
        res.status(400).send({message:"dish origin deletion failed!"});
        return;
    }
}

module.exports.getAllDishesOrigins = async(req,res)=>{

    const dishOrigins = await renderDishesOrigins();
    if(dishOrigins){
        res.status(200).send({
            message:"dish origins",
            data:dishOrigins
        })
        return dishOrigins;
    }
    res.status(404).send({
        message:"dish origins not found"
    })
}


module.exports.getDishOriginById = async(req,res)=>{
    const dishOrigin = await getDishOriginById(req.params);
    if(dishOrigin){
        return res.status(200).json({
            message:"dish origin",
            data:dishOrigin
        })
    }
    return res.status(404).json({
        message:"dish origin not found",
    })
}
