const mongoose = require('mongoose');

//ad schema
const ProductSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})

module.exports = mongoose.model('products',ProductSchema);