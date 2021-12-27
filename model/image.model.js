const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Image',ImageSchema);