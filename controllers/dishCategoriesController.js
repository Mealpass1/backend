const {renderDishesCategories,createNewDishCategory,getDishCategoryById,deleteDishCategory} = require('../services/dishCategories.service');
const {checkDishCategoryExistence} = require('../helpers/dishCategory.exists');


module.exports.dishCategoryRegistrationController = async(req,res)=>{
    if((await checkDishCategoryExistence(req.body.categoryName)===true)){
        res.status(400).send({
            message:"category exists"
        })
    }
    else{
        const registeredDishCategory = await createNewDishCategory(req.body);
        if(registeredDishCategory){
            res.status(201).send({message:"created"});
            return;
        }
        return res.status(500).send({message:"server error"});
    }
}

module.exports.deleteDishCategoryController = async(req,res)=>{
    const deletedDishCategory = await deleteDishCategory(req.params);
    if(deletedDishCategory){
        res.status(200).send({message:"dish category deleted successfully"});
        return deletedDishCategory;
    }
    else{
        res.status(400).send({message:"dish category deletion failed!"});
        return;
    }
}

module.exports.getAllDishesCategories = async(_,res)=>{
  console.log("Uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
    const dishCategories = await renderDishesCategories();
    if(dishCategories){
        res.status(200).send({
            message:"dish categories",
            data:dishCategories
        })
        return dishCategories;
    }
    res.status(404).send({
        message:"dish categories not found"
    })
}

module.exports.getDishCategoryById = async(req,res)=>{
    const dishCategory = await getDishCategoryById(req.params);
    if(dishCategory){
        return res.status(200).json({
            message:"dish category",
            data:dishCategory
        })
    }
    return res.status(404).json({
        message:"dish category not found",
    })
}

