const express = require('express');
require('./db/config');

const app = express();

const Users = require('./db/User');

//api for signup page;

app.post('/signup',(req,resp)=>{
    resp.send("data get.............")
})

app.listen(4500);

