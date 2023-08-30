const express = require('express');
const mongoose = require('mongoose');


const app = express();

const connectDB = async ()=> {
    mongoose.connect('mongodb://127.0.0.1:27017/mango-practice');
    const usersSchema = new mongoose.Schema({});
    const usersModel = mongoose.model('users',usersSchema);
    const data = await usersModel.find();
    console.warn(data);
}
connectDB();
app.listen(4500);

