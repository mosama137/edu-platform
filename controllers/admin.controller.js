const { User, Subject, Teacher } = require('../models')
const createError = require('http-errors')


// getting data
const getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find({})
        res.send(subjects.toJSON())
    } catch (error) {
        next(createError.BadRequest())
    }
}
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({})
        res.send(teachers.toJSON())
    } catch (error) {
        next(createError.BadRequest())
    }
}
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({})
        res.send(students.toJSON())
    } catch (error) {
        next(createError.BadRequest())
    }
}


// Subjects control
const addSubject = async (req, res, next) => {
    try {
        const subject = await Subject.create(req.body)
        res.send(subject)

    } catch (error) {
        next(createError.BadRequest())
    }
}
const delSubject = async (req, res, next) => {
    try {
        const name = req.body
        const subject = await Subject.findOneAndDelete({ name })
    } catch (error) {
        next(createError.BadRequest())
    }
}

// update subject's teacher
const updateSubjectTeacher = async (req, res, next) => {
    try {
        const { teacher_id, name } = req.body
        const subject = await Subject.findOneAndUpdate({ name }, {
            $set: {
                teacher_id: teacher_id
            }
        })

    } catch (error) {
        next(createError.BadRequest())
    }
}

//  control accounts activation
const activeAccount = async (req, res, next) => {
    try {
        const { user_id, activeValue } = req.body
        const user = await User.findByIdAndUpdate({ user_id }, {
            $set: {
                isActive: activeValue
            }
        }
        )
        res.send(user.toJSON())

    } catch (error) {
        next(createError.BadRequest())
    }
}




module.exports = {
    addSubject,
    updateSubjectTeacher,
    delSubject,
    activeAccount,
    getSubjects,
    getStudents,
    getTeachers
}