const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishOriginsSchema = new Schema({
    dishOriginNumber:{
        type: Number,
        required: true
    },
    dishOriginName:{
        type: String,
        required: true
    },
    dishOriginDescription:{
        type: String,
        required: true,
        max: 255,
        min: 20
    }
})
module.exports = mongoose.model("dishOrigins",dishOriginsSchema);