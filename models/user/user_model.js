const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userModel = new Schema(
    {
        full_name: {
            type: String,
            required: [true, "full name is required"],
            trim: true,
        },
        national_id: {
            type: String,
            required: [true, "national id is required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true, // Convert email to lowercase
        },
        phone: {
            type: String,
            required: [true, "phone number is required"],
            trim: true
        },
        role: {
            type: String,
            enum: ['student', 'teacher', 'admin'],
            required: true
        },
        password: {
            type: String,
            minlength: 8,
            required: [true, , "password is required"]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        profilePictureUrl: {
            type: String,
        }

    },
    { timestamps: true }
)

userModel.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10)
            return (this.password = hashedPassword);
        }
        return next()
    }
    catch (error) {
        return next(error)
    }
})


userModel.pre('updateOne', async function (next) {
    try {
        if (this._update.password) {
            const hashedPassword = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashedPassword
        }
        return next()
    } catch (error) {

    }
})


userModel.methods.verifyPassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
}
// userModel.methods.verifylogin= async function()

const User = mongoose.model("User", userModel)

module.exports = User;