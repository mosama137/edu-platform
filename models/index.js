const User = require("./user/user_model")
const Student = require('./basedOnRole/student.model')
const Teacher = require('./basedOnRole/teacher.model')
const Admin = require('./basedOnRole/admin.model')
const Subject = require('./subject/subject_model')
const Exam = require('./exam/exam.model')

module.exports = {
    User,
    Student,
    Teacher,
    Admin,
    Subject,
    Exam,
}