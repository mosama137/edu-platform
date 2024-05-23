const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Exam Result Schema
const examResultSchema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    score: Number,
    // Other exam result fields
});



const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;