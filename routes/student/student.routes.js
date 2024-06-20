const studentRouter = require('express').Router()
const studentController = require('../../controllers/student.controller')

// matches /api/v1/student/get-subjects
studentRouter.get('/courses', studentController.getCourses)
studentRouter.get('/exams', studentController.getExams)
studentRouter.get('/results', studentController.getResults)


module.exports = studentRouter