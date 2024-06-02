const User = require('./user/user.model')
const Student = require('./basedOnRole/student.model')
const Teacher = require('./basedOnRole/teacher.model')
const Admin = require('./basedOnRole/admin.model')
const Subject = require('./subject/subject_model')
const Exam = require('./exam/exam.model')
const ExamResult = require('./exam_results/exam.result')


const PaymentLevels = require('./payment/payment.levels.model')
const PaymentMethods = require('./payment/payment.methods.model')
const PaymentHistory = require('./payment/payment.history.model')

module.exports = {
    User,
    Student,
    Teacher,
    Admin,
    Subject,
    Exam,
    ExamResult,
    PaymentLevels,
    PaymentMethods,
    PaymentHistory
}