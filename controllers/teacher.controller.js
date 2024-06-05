const upload = require('../helpers/upload.files')
const { Subject, Teacher, Student, Exam, } = require('../models')
const createError = require('http-errors')


// -------------------------Courses Page------------------------------------
// matches GET /api/v1/teacher/Courses
const getCourses = async (req, res, next) => {
    try {
        const { user_id } = req.body
        const teacher = await Teacher.findById(user_id).populate({
            path: 'subjects',
            select: '_id subject_name level content'
        })
        const formattedCourses = teacher.subjects.map(subject => ({
            subject_id: subject._id,
            subject_name: subject.subject_name,
            level: subject.level,
            content: subject.content,
        }))

        res.send(formattedCourses)
    } catch (error) {
        console.log(error);
    }
}
// matches POST /api/v1/teacher/content
const uploadContent = async (req, res, next) => {
    try {
        const { title, subject_name } = req.body
        const { filename, path } = req.file
        await Subject.findOneAndUpdate({ subject_name: subject_name },
            {
                $addToSet: {
                    content: {
                        title: title,
                        path: `/public/files/${filename}`
                    }
                }
            }
        )

        res.send({ msg: "success" })

    } catch (error) {
        next(createError.InternalServerError())
    }
}
// matches DEL /api/v1/teacher/content
const delContent = async (req, res, next) => {
    try {
        const { title, subject_name } = req.body
        await Subject.updateOne(
            { subject_name: subject_name },
            { $pull: { content: { title: title } } }
        )

        res.send({ msg: "success" })

    } catch (error) {
        next(createError.InternalServerError())
    }
}

// -------------------------Exam Page------------------------------------
// matches GET /api/v1/teacher/exam
const getExams = async (req, res, next) => {
    try {
        const { user_id } = req.body
        const exams = await Exam.find({ teacher_id: user_id })
        res.send(exams)
    } catch (error) {
        next(createError.BadRequest("something went wrong!"))
    }
}

// matches POST /api/v1/teacher/exam
const uploadExam = async (req, res, next) => {
    try {
        const { teacher_id, subject_id, title, startAt, duration, questions } = req.body
        const createdExam = await Exam.create({
            teacher_id: teacher_id,
            subject_id: subject_id,
            title: title,
            startAt: startAt,
            duration: duration,
            questions: questions
        })
        res.send({
            status: 201,
            msg: 'Exam has been created',
            exam: createdExam,
        })
    } catch (error) {
        next(createError.BadRequest('failed to create the exam'))
    }
}
// matches GET /api/v1/teacher/upload/exam
const delExam = async (req, res, next) => {
    try {
        const { exam_id } = req.body
        const deletedExam = Exam.findByIdAndDelete(exam_id)
        if (!deletedExam) {
            next(createError.NotFound('Exam not Found'))
        }
        res.send(deletedExam)

    } catch (error) {
        next(createError.BadRequest('failed to delete Exam'))

    }
}


module.exports = {
    getCourses,
    uploadContent,
    delContent,
    getExams,
    uploadExam,
    delExam
}