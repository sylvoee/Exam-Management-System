const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    subject:String,
    noOfQuestions: Number,
    date: Date,
    time: Date,
    duration: Number,
});


const scheduleModel = mongoose.model( 'schedule', scheduleSchema);
module.exports = scheduleModel;
