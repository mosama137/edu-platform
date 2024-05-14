const { User, Student, Teacher, Admin, Subject } = require('../models')
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
            const student = await Student.findById(user._id);
            if (student) {
                userFormattedData.level = student.level;
                // Fetch subjects based on student level
                const subjects = await Subject.find({ level: student.level }).select("subject_name");
                userFormattedData.subjects = subjects;
            }
        }

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
        if (!username || !password) throw createError.BadRequest('username or password required')
        const user = await User.findOne({ national_id:username })
        // if user exist -> check password -> return token
        if (user) {
            const isPasswordValid = await user.verifyPassword(password);

            if (!isPasswordValid) throw createError.Conflict("Wrong username or password")
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
                const student = await Student.findById(user._id);
                if (student) {
                    userFormattedData.level = student.level;
                    // Fetch subjects based on student level
                    const subjects = await Subject.find({ level: student.level }).select("subject_name");
                    userFormattedData.subjects = subjects;
                }
            }
            // If user is a teacher, fetch assigned subjects
            if (user.role === 'teacher') {
                // Assuming teachers have an array of subject IDs they teach
                const teacher = await Teacher.findById(user._id);
                if (teacher) {
                    // Fetch subjects based on assigned subject IDs
                    const subjects = await Subject.find({ _id: { $in: teacher.subjects } }).select('subject_name _id level ');
                    userFormattedData.subjects = subjects.map(subject => subject);
                }
            }

            //send token
            return res.send(
                { token: accessToken, user: userFormattedData }
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