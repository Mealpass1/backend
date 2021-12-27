const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
    userId:{
     type: String,
     required: true
    },
    mealCost:{
        type: Number,
        required: true
    },
    ServiceFee:{
        type: Number,
        required: true
    },
    Taxes:{
        type: Number,
        default: 0,
        required: false
    },
    Total:{
        type: Number,
        required: true
    },
    products:{
        type: Array,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Checkout',checkoutSchema);