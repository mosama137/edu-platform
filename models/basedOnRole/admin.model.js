const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminModel = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
    },
)



const Admin = mongoose.model("Admin", adminModel)

module.exports = Admin