const express = require('express');
const cors = require('cors')
require('./db/config');

const app = express();

const Users = require('./db/User');

//api for signup page;
app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    let data = new Users(req.body)
    
    let result = await data.save();
    resp.send(result);
})
//login api
app.post('/login', async(req,resp)=>{
    let user =await Users.findOne(req.body).select("-password");
    resp.send(user);
      
})

app.listen(4500);

