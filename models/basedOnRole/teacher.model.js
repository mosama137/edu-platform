const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createError = require('http-errors')

const teacherModel = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                unique: true
            }
        ],
    }
)



const Teacher = mongoose.model("Teacher", teacherModel)

module.exports = Teacher