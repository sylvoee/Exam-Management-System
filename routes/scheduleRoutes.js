const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const scheduleModel = require('../model/scheduleSchema');

mongoose.connect('mongodb://localhost/quiz_managerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Home
router.get('/scheduleHome', (req, res)=>{
    res.send("This is my world");
  
});

//read
router.get('/schedule', (req, res)=>{
    scheduleModel.find({}, (data)=>{
      res.send(data);
      console.log(data);
    })
    // res.send(allSchedule);

});

// create a Schedule
// post message
let postScheduleMsg = [];
router.post('/schedule', (req, res)=>{
    // making an instance of a table model
const instance = new scheduleModel();
instance.subject = req.body.subject;  
instance.duration = req.body.duration;
instance.noOfQuestions = req.body.noOfQuestions;
instance.time = req.body.time;
instance.date = req.body.date

instance.save(function (err) {
    postScheduleMsg.push({msg : "Sucesss!!! Exam has been scheduled"})
  console.log(postScheduleMsg[0].msg);
  res.send(postScheduleMsg);
});
 console.log(instance);
});


// delete schedule
// delete message
let deleteScheduleMsg = [];
router.delete('/schedule/:id', (req, res)=>{
    scheduleModel.deleteOne({_id : req.params.id},function(data){
    deleteScheduleMsg.push({msg:"A schedule has been deleted!"})  
        
        res.send(deleteScheduleMsg[0].msg);
     });

});


// Edit 
let editScheduleMsg = []
router.patch('/schedule/:id', (req, res)=>{
    const{duration, time, date, noOfQuestions, subject} = scheduleModel;
    scheduleModel.updateOne({"_id":req.params.id}, {$set :{
        duration : req.body.duration,
        time : req.body.time,
        date : req.body.date,
        noOfQuestions: req.body.noOfQuestions,
        subject: req.body.subject

    }
}, ()=>{
    editScheduleMsg.push({msg: "Schedule has been updated"});
    res.send(editScheduleMsg[0].msg);
});
   
});


module.exports = router;