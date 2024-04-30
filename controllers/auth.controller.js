const { User, Student, Teacher, Admin } = require('../models')
const { signAccessToken } = require('../helpers/access_token')
const createError = require('http-errors')


const register = async function (req, res, next) {
    try {
        const { full_name, national_id, role, phone, email, password } = req.body
        const user = await User.create({ full_name, national_id, role, phone, email, password })
        if (role === "student") {
            const { level } = req.body
            await Student.create({ _id: user.id, level })
        } else if (role === "teacher") {
            await Teacher.create({ _id: user.id })
        } else if (role === "admin") {
            await Admin.create({ _id: user.id })
        }
        const accessToken = await signAccessToken(user)
        //send token
        return res.send(
            { token: accessToken }
        )

    } catch (error) {
        // Handling Duplicate Key Error (adding id already exists)/ MongoServerError
        // user already exists!
        if (error.code === 11000) {
            return next(createError.Conflict('Invalid National ID'))
        }
        // Handling Validation Errors for Required or Missing Keys
        else if (error.name === 'ValidationError') {
            return next(createError.BadRequest('Required or Missing Fields'))
        }
    }

}

const login = async function (req, res, next) {
    try {
        const { username, password } = req.body
        // check getting username and password
        if (!username || !password) throw createError.BadRequest('username or password required')
        // search by national id
        const national_id = username
        const user = await User.findOne({ national_id })
        // if user exist -> check password -> return token
        if (user) {
            const isPasswordValid = await user.verifyPassword(password);

            if (!isPasswordValid) throw createError.Conflict("Wrong username or password")
            // get token
            const accessToken = await signAccessToken(user.id)
            //send token
            return res.send(
                { token: accessToken }
            )
        }

    } catch (error) {
        next(error)
    }
}

const refreshToken = (req, res) => {
    // 
}
const logout = (req, res) => {
    // 
}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}