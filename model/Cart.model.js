const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    dishId:{
        type: String,
        required: true
    },
    dishName:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min:[1,'quantity should be positive']
    },
    price:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        default: 0
    },
    imgUrl:{
        type: String,
        required: true
    },
    timeOfMeal:{
        type: String,
        required: false
    },
    daysInWeek:[{
        type: String,
        enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        required: false
    }],
    NumberOfRepetition:{
        type: String,
        required: false
    },
    additionalTopping:[
        {
        toppingName:{
            type: String,
            required: false,
        },
        toppingPrice:{
            type: Number,
            required: false,
        }
    }
    ]

}, {timestamps: true}
);


module.exports = mongoose.model('Cart',cartSchema);


