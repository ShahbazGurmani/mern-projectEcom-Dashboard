const mongoose = require('mongoose');

//add sechema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

//here we can add model;
module.exports = mongoose.model('users',userSchema);