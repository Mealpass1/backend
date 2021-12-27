const {getDishById,deleteDish,getAllDishes,createNewDish} = require('../services/dish.service');
const {checkDishExistence} = require('../helpers/dish.exists');

module.exports.dishRegistrationController = async(req,res)=>{
    if((await checkDishExistence(req.body.dishName)===true)){
        res.status(400).send({
            message:"dish exists"
        })
    }
    else{
        const registeredDish = await createNewDish(req.body,req.file, req.user.id);
        if(registeredDish){
           return res.status(201).send({message:"created"})
        }
        return res.status(500).send({message:"server error"});
    }
}

module.exports.deleteDishController = async(req,res)=>{
    const deletedDish = await deleteDish(req.params);
    if(deletedDish){
        res.status(200).send({message:"dish deleted successfully"});
        return deletedDish;
    }
    else{
        res.status(400).send({message:"dish deletion failed!"});
        return;
    }
}


module.exports.getAllDishes = async(req,res)=>{

    const dishes = await getAllDishes();
    if(dishes){
        res.status(200).send({
            message:"dishes",
            data:dishes
        })
        return dishes;
    }
    res.status(404).send({
        message:"dishes not found"
    })
}

module.exports.getDishById = async(req,res)=>{
    const dish = await getDishById(req.params);
    if(dish){
        return res.status(200).json({
            message:"dish",
            data:dish
        })
    }
    return res.status(404).json({
        message:"dish not found",
    })
}
