const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const questionsModel = require('./model/loadQuestionsSchema')

mongoose.connect('mongodb://localhost/quiz_managerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


// Home Route
router.get('/', (req, res)=>{
    res.send("HOME Route");
  });
  


// load questions  or read question route
router.get('/loadQuestions', (req, res)=>{
    res.send("Load Questions");
    
});

// create questions
// post message
let postQuestionMsg = [];
router.post('/loadQuestions', (req, res)=>{
    // making an instance of a table model
const instance = new questionsModel();
instance.question = req.body.question;  
instance.optons = req.body.options;
instance.answer = req.body.answer;
instance.image = req.body.image;

instance.save(function (err) {
  postQuestionMsg.push({msg : "Questions has been posted ok"})
  console.log(postQuestionMsg[0].msg);
  res.send(postQuestionMsg);
});
 console.log(instance);
});


// read or query from database


//delete questions
// delete message
let deleteQuestionMsg = [];
router.delete('/loadQuestions/:id', (req, res)=>{
    questionsModel.deleteOne({_id : req.params.id},function(data){
    deleteQuestionMsg.push({msg:"Questions has been deleted!"})  
        
        res.send(deleteQuestionMsg[0].msg);
     });

});

// Edit 
// Edit questions Message
let editQuestionMsg = []
router.patch('/loadQuestions/:id', (req, res)=>{
    const{question, options, answer, image, subject} = questionsModel;
    questionsModel.updateOne({"_id":req.params.id}, {$set :{
        question : req.body.question,
        options : req.body.options,
        answer : req.body.answer,
        image: req.body.image,
        subject: req.body.subject

    }
}, ()=>{
    editQuestionMsg.push({msg: "Question has been updated"});
    res.send(editQuestionMsg[0].msg);
});
   
});

module.exports = router;
