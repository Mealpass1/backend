const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantsSchema = new Schema({
    Business_name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    Office_address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        required: false
    },
    imgUrl: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/dnfeo5ce9/image/upload/v1637226911/default_ula86a.jpg'
    },
    restaurant_desc: {
        type: String,
        required: false,
        default: ''
    }
})
module.exports = mongoose.model("Restaurants", restaurantsSchema)
