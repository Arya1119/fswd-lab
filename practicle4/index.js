const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dbConnect =mongoose.connect("mongodb://localhost:27017/StudentDB");
const port=1119;
var cors = require('cors');

dbConnect.then((d)=>{
  console.log("successfully connected to db");
});
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(200).send("hello express");
});

app.use('/api',require('./controller/controller'));



app.listen(port,()=>{
  console.log(`sever listening on http://localhost:${port}`);
})