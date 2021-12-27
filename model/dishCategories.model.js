const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishCategoriesSchema = new Schema({
    categoryNumber:{
        type:Number,
        required: true,
    },
    categoryName:{
       type: String,
       require: true
    },
    categoryDescription:{
        type: String,
        required: true,
        max: 255,
        min: 20
    }
})

module.exports = mongoose.model("dishCategories",dishCategoriesSchema);