const express = require('express');
require('./db/config');

const app = express();

const Users = require('./db/User');

//api for signup page;
app.use(express.json());

app.post('/register',(req,resp)=>{

    resp.send(req.body)
})

app.listen(4500);

