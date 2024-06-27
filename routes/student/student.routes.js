const studentRouter = require('express').Router()
const studentController = require('../../controllers/student.controller')

// matches GET /api/v1/student/courses
studentRouter.get('/courses', studentController.getCourses)

// matches GET /api/v1/student/exams
studentRouter.get('/exams', studentController.getExams)

// matches GET /api/v1/student/take-exam
studentRouter.get('/take-exam', studentController.takeExam)
studentRouter.post('/exam-result', studentController.addResult)

// matches GET /api/v1/student/results
studentRouter.get('/results', studentController.getResults)

// matches GET /api/v1/student/pay
studentRouter.get('/pay', studentController.getPay)

// matches POST /api/v1/student/pay
studentRouter.post('/pay', studentController.createPay)





module.exports = studentRouter