const express = require('express');

const app = express();

app.get('/',(req, resp)=>{
    resp.send("api word")
})

app.listen(4500);