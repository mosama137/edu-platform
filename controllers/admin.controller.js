const { User, Subject, Teacher, Student } = require('../models')
const createError = require('http-errors')


// getting data
const getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find({}).select('subject_name level teacher_id').populate({
            path: 'teacher_id',
            populate: {
                path: '_id',
                select: "full_name"
            } // Include only the 'name' field from the Teacher model
        })
        res.send(subjects)
    } catch (error) {
        next(createError.BadRequest())
    }
}
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({})
        res.send(teachers)
    } catch (error) {
        next(createError.BadRequest())
    }
}
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({})
        res.send(students)
    } catch (error) {
        next(createError.BadRequest())
    }
}


// Subjects control
const addSubject = async (req, res, next) => {
    try {
        const teacher_id = req.body.teacher_id //get teacher user_id
        const subject = await Subject.create(req.body)
        if (teacher_id) {
            await Teacher.findOneAndUpdate({ teacher_id }, {
                $addToSet: {
                    subjects: subject.id
                }
            })
        }
        res.send(subject)

    } catch (error) {
        console.log(error)
        next(createError.BadRequest())
    }
}

// update subject's teacher
const updateSubjectTeacher = async (req, res, next) => {
    try {
        const { teacher_id, subject_id } = req.body
        const subject = await Subject.findByIdAndUpdate(subject_id, {
            $set: {
                teacher_id: teacher_id
            }
        })
        await Teacher.findByIdAndUpdate(teacher_id, {
            //we use add to set to compare and didn't duplicate 
            $addToSet: {
                subjects: subject_id
            }
        })
        return res.send(subject)
    } catch (error) {
        console.log(error);
        next(createError.BadRequest())
    }
}

const delSubject = async (req, res, next) => {
    try {
        const subject_id = req.body
        const deletedSubject = await Subject.findByIdAndDelete({ subject_id })
        if (!deletedSubject) {
            next(createError.BadRequest('subject not found'))
        }
        // Remove the subject ID from all teacher documents
        await Teacher.updateMany(
            { subjects: subject_id }, // Find teachers with the subject ID
            { $pull: { subjects: subject_id } } // Remove the subject ID from the array
        );

    } catch (error) {
        next(createError.BadRequest())
    }
}


//  control accounts activation
const activeAccount = async (req, res, next) => {
    try {
        const { user_id, activeValue } = req.body
        const user = await User.findByIdAndUpdate(user_id, {
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