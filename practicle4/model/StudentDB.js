const mongoose =require('mongoose');
const { Schema } = mongoose;

const Student= new Schema({
sid:{
    type: String,
    unique: true,
    required: true,
  },
name:{
    type: String,
    required: true,
  },
address:{
    type: String,
    required: true,
  },
mobileno:{
    type: Number,
    required: true,
  },
});

const StudentDb=mongoose.model("StudentDB",Student);
module.exports=StudentDb;   