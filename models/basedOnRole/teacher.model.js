const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherModel = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            }
        ],
    }
)



const Teacher = mongoose.model("Teacher", teacherModel)

module.exports = Teacher