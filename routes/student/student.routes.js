const studentRouter = require('express').Router()
const studentController = require('../../controllers/student.controller')

// matches /api/v1/student/get-subjects
studentRouter.get('/get-subjects', studentController.getSubjects)
studentRouter.get('/get-exams', studentController.getAvailableExams)
studentRouter.get('/get-exams-result', studentController.getExamResults)


module.exports = studentRouter