const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const loadQuesetionsSchema = new Schema({
    question: {type: String },
    options:{type: Array },
    answer: {type: String },
    image: {type: String },
    subject: {type: String},
    date: { type: Date, default: Date.now }
});

const questionsModel = mongoose.model('questions', loadQuesetionsSchema);
module.exports = questionsModel;