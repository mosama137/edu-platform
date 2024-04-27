const teacherRouter = require('express').Router()
const teacherController = require('../../controllers/teacher.controller')



// matches /api/v1/teacher/
studentRouter.get('/update-content', teacherController.updateContent)
studentRouter.get('/del-content', teacherController.delContent)



module.exports = teacherRouter