const express = require('express');
const mongoose = require('mongoose');


const app = express();

const connectDB = async ()=> {
    mongoose.connect('mongodb://127.0.0.1:27017')
}

app.listen(4500);

