const express = require("express");
const cors = require("cors");
const Jwt = require('jsonwebtoken'); 
const jwtKey = 'e-commdb';
require("./db/config");

const app = express();
//collections
const Users = require("./db/User");
const Products = require('./db/Product');

//api for signup page;
app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
  let data = new Users(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password
  Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
    if(err)
    {
      resp.send({result:"Something went wrong "});
    }
    resp.send({result,auth:token});
  }); 

});


//login api
app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err)
        {
          resp.send({result:"Something went wrong "});
        }
        resp.send({user,auth:token});
      })
     
    } else {
        resp.send({result:"User Not Found"});
    }
  }else
  {
      resp.send({result:"User Not Found"});
  }
});


//product table api craetion:
app.post('/add-product',async(req,resp)=>{
    let product = new Products(req.body);
    let result = await product.save();
    resp.send(result);

})


//getProduct data api
app.get('/product-data',async(req,resp)=>{
    let data = await Products.find();
    if(data.length>0)
    {
      resp.send(data);
    }
    else
    {
      resp.send({result:"No Product Found"});
    }

})

//delete api:
app.delete('/delete-product/:id',async(req,resp)=>{
   
    let result = await Products.deleteOne({_id:req.params.id});
    resp.send(result);

})

//updateapi
app.get('/product/:id',async(req,resp)=>{
  let result = await Products.findOne({_id:req.params.id})
  if(result)
  {
    resp.send(result)
  }else
  {
    resp.send({result:'no record found'})
  }
})

app.put('/product-update/:id',async(req,resp)=>{
  let result = await Products.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
  )
  resp.send(result);
})

//search api
app.get('/search/:key',async(req,resp)=>{
   let result = await Products.find({
    '$or':[
      {name:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
   });
   resp.send(result);
})
//verify token
function veriftToken()
{
  console.warn("middle ware active");
  next;
}
app.listen(4500);
