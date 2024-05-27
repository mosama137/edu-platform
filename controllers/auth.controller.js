const { User, Student, Teacher, Admin, Subject } = require('../models')
const { signAccessToken } = require('../helpers/access_token')
const createError = require('http-errors')

const register = async (req, res, next) => {
    try {
        const { full_name, national_id, role, phone, password, level } = req.body;
        const user = await User.create({ full_name, national_id, role, phone, email, password });

        // user Json 
        const userFormattedData = {
            user_id: user._id,
            full_name: user.full_name,
            national_id: user.national_id,
            isActive: user.isActive,
            email: user.email,
            role: user.role,
        };

        // Create specific role document based on the user's role
        switch (role) {
            case "student":
                await Student.create({ _id: user._id, level });
                break;
            case "teacher":
                await Teacher.create({ _id: user._id });
                break;
            case "admin":
                await Admin.create({ _id: user._id });
                break;
            default:
                throw createError.NotFound('Invalid role provided');
        }

        const accessToken = await signAccessToken(user);

        //send token and user Data
        return res.send(
            { token: accessToken, user: userFormattedData }
        )

    } catch (error) {
        // Handling Duplicate Key Error (adding id already exists)/ MongoServerError
        // user already exists!
        console.log(error)
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
        if (!username || !password) {
            throw createError.BadRequest('username or password required')
        }
        const user = await User.findOne({ national_id: username })
        // if user exist -> check password -> return token
        if (!user) {
            throw createError.Conflict('Wrong username or password');
        }
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            throw createError.Conflict('Wrong username or password');
        }
        // get token
        const accessToken = await signAccessToken(user.id)

        const userFormattedData = {
            user_id: user._id,
            full_name: user.full_name,
            national_id: user.national_id,
            isActive: user.isActive,
            email: user.email,
            role: user.role
        }

        // If user is a student, fetch student level and subjects
        if (user.role === "student") {
            const student = await Student.findById(user._id).select('level');
            if (student) {
                userFormattedData.level = student.level;
                const subjects = await Subject.find({ level: student.level }).select("subject_name _id content");
                userFormattedData.subjects = subjects;
            }
        }
        // If user is a teacher, fetch assigned subjects
        else if (user.role === 'teacher') {
            const teacher = await Teacher.findById(user._id).select('subjects');
            if (teacher) {
                const subjects = await Subject.find({ _id: { $in: teacher.subjects } }).select('subject_name _id level content');
                userFormattedData.subjects = subjects;
            }
        }

        //send token
        return res.send(
            { token: accessToken, user: userFormattedData }
        )


    } catch (error) {
        console.log(error);
        next(createError.BadRequest('Failed to Login'))
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