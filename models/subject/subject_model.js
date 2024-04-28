const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Exam Schema
const subjectSchema = new Schema({
    subject_name: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: Number,
        required: true,
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    content: [
        {
            title: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        }
    ]
    // Other exam fields
});


const Subject = mongoose.model('Subject', subjectSchema);


module.exports = Subject;