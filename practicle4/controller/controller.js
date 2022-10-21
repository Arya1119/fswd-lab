const StudentDB= require("../model/StudentDB");
const express =require("express");
const router= express.Router();




router.post("/submitStudent",(req,res)=>{
    let newStudent= new StudentDB(
      {
         sid:req.body.sid,
         name:req.body.name,
         address:req.body.address,
         mobileno:req.body.mobileno
      }
    ); 
    console.log(newStudent);
    newStudent.save().then((student)=>{
      res.status(200).send(student);
    }) .catch(err=>{
      console.log(err);
      res.status(400).send(err);
    });
});

router.get("/studentList",(req,res)=>{
    StudentDB.find({},(err, student) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
  
      res.status(200).send(student);
    });
});

router.get("/studentList/:sid",(req,res)=>{
    StudentDB.findOne({sid:req.params.sid},(err,student)=>{
      if(err){
        res.status(400).send(err);
        console.log(err);
      }

      res.status(200).send(student);
    });
});

router.delete("/deleteStudentList/:sid",(req,res)=>{
  StudentDB.deleteOne({sid:req.params.sid},(err,student)=>{
           if(err){
            console.log(err);
           }
           res.status(200).send(student);
  });
});

router.put("/updateStudent/:sid",(req,res)=>{
  let student = {};

  if (req.body.sid) student.sid = req.body.sid;
  if (req.body.name) student.name = req.body.name;
  if (req.body.address) student.address = req.body.address;
  if (req.body.mobileno) student.mobileno = req.body.mobileno;

   StudentDB.updateOne({sid:req.params.sid},student).then((user)=>{
    res.status(200).send(user);
   }).catch((err)=>{
    req.status(400).send(err);
   });

});
module.exports= router;