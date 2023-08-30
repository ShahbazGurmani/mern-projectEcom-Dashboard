const express = require("express");
const cors = require("cors");
require("./db/config");

const app = express();

const Users = require("./db/User");

//api for signup page;
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let data = new Users(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password
  resp.send(result);
});


//login api
app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
        resp.send({result:"User Not Found"});
    }
  }else
  {
      resp.send({result:"User Not Found"});
  }
});

app.listen(4500);
