const { Student, Subject, Exam, PaymentLevels, PaymentHistory } = require('../models')
const createError = require('http-errors')




// matches GET /api/v1/student/courses
const getCourses = async (req, res, next) => {
    try {
        const level = req.query.level
        const courses = await Subject.find({ level: level })

        const formattedCourses = courses.map(subject => ({
            subject_id: subject._id,
            subject_name: subject.subject_name,
            level: subject.level,
            content: subject.content,
        }))
        res.send(formattedCourses)
    } catch (error) {
        next(createError.BadRequest('failed to fetch data.'))
    }


}

// matches GET /api/v1/student/exams
const getExams = async (req, res, next) => {
    try {
        const level = req.query.level
        const availableExams = await Exam.find({ level: level }).populate({
            path: 'subject_id',
            select: '_id subject_name level'
        })
        const formattedExams = availableExams.map(exam => ({
            exam_id: exam.id,
            subject_id: exam.subject_id._id,
            subject_name: exam.subject_id.subject_name,
            title: exam.title,
            duration: exam.duration,
            startAt: exam.startAt
        }))
        res.send(formattedExams)

    } catch (error) {
        next(createError.BadRequest('failed to fetch Data.'))
    }
}

// matches GET /api/v1/student/take-exam
const takeExam = async (req, res, next) => {
    try {
        const exam_id = req.params.exam_id
        const questions = await Exam.findById(exam_id).select('questions')
        res.send(questions)
    } catch (error) {
        next(createError.BadRequest('Failed to fetch Data.'))
    }
}

// matches GET /api/v1/student/results
const getResults = async (req, res, next) => {
    try {
        // 
    } catch (error) {
        next(createError.BadRequest('Failed to fetch Data.'))
    }
}

// matches GET /api/v1/student/pay
const getPay = async (req, res, next) => {
    try {
        const level = req.query.level
        const getLevelAmount = await PaymentLevels.find({ level: level }).lean()
        const getMethods = await PaymentMethods.find({}).lean()

        return res.send({
            getLevelAmount,
            getMethods
        })
    } catch (error) {
        next(createError.BadRequest('Failed to fetch Data.'))

    }
}
// matches POST /api/v1/student/pay
const createPay = async (req, res, next) => {
    try {
        const { user_id, level, payment_method, paid_from, paid_to } = req.body
        const payment = await PaymentHistory.create({
            user_id: user_id,
            level: level,
            payment_method: payment_method,
            paid_from: paid_from,
            paid_to: paid_to
        }).lean()
        res.send({
            status: 201,
            msg: "created!",
            res: payment
        })
        // 
    } catch (error) {
        next(createError.BadRequest('Failed to fetch Data.'))
    }
}

module.exports = {
    getCourses,
    getExams,
    getResults,
    takeExam,
    getPay,
    createPay

}