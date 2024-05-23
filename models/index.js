const User = require('./user/user.model')
const Student = require('./basedOnRole/student.model')
const Teacher = require('./basedOnRole/teacher.model')
const Admin = require('./basedOnRole/admin.model')
const Subject = require('./subject/subject_model')
const Exam = require('./exam/exam.model')
const ExamResult = require('./exam_results/exam.result')

const Payment = require('./payment/payment.model')
const PaymentHistory = require('./payment/payment.history')

module.exports = {
    User,
    Student,
    Teacher,
    Admin,
    Subject,
    Exam,
    ExamResult,
    Payment,
    PaymentHistory
}