const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentModel = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        level: String,

    },
    { timestamps: true }
)



const Student = mongoose.model("Student", studentModel)

module.exports = Student