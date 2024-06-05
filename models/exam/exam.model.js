const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    questionText: String,
    options: [String],
    correctOptionIndex: Number
})



const examSchema = new Schema({
    teacher_id: {
        type: Schema.ObjectId,
        ref: "User"
    },
    subject_id: {
        type: Schema.ObjectId,
        ref: "Subject"
    },
    title: String,
    startAt: Date,
    duration: Number,
    questions: [questionSchema]
});


const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;