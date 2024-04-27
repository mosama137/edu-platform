const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminModel = new Schema(
    {
        user_id: String,


    },
    { timestamps: true }
)



const Admin = mongoose.model("Admin", adminModel)

module.exports = Admin