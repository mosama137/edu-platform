const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Exam Result Schema
const examResultSchema = new mongoose.Schema({
    subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    score: Number,
    // Other exam result fields
});



const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;