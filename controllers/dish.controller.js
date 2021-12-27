const {getDishById,deleteDish,getAllDishes,createNewDish,getDishByRestaurant} = require('../services/dish.service');
const {checkDishExistence} = require('../helpers/dish.exists');

module.exports.dishRegistrationController = async(req,res)=>{
    if((await checkDishExistence(req.body.dishName)===true)){
        res.status(400).send({
            message:"dish exists"
        })
    }
    else{
        try{
            const registeredDish = await createNewDish(req.body,req.file,req.restaurant.restrauntId);
            if(registeredDish){
                return res.status(200).json({ msg: "dish successfully saved" });
            }
            return res.status(422).json({ error: "invalid data" });
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ error: "some error occured" });
        }
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


module.exports.getDishByRestaurantController = async(req,res)=>{
    try{
        const results = await getDishByRestaurant(req.params.id);
        if(!results) return res.status(404).json({
            status:false,
            msg:"Not Found"
        })
        return res.status(200).json({
            status: true,
            msg: "List of dishes",
            data:results
        })
    }
    catch(error){
        console.log(error);
        return error;
    }
}
