const teacherRouter = require('express').Router()
const teacherController = require('../../controllers/teacher.controller')
const upload = require('../../helpers/upload.files')



// matches /api/v1/teacher/
// -------------------------Courses Page------------------------------------

teacherRouter.get('/courses', teacherController.getCourses)
teacherRouter.post('/content', upload.single('pdf'), teacherController.uploadContent)
teacherRouter.delete('/content', teacherController.delContent)

// -------------------------EXAM Page------------------------------------
teacherRouter.get('/exam', teacherController.getExams)
teacherRouter.post('/exam', teacherController.uploadExam)
teacherRouter.delete('/exam', teacherController.delExam)




module.exports = teacherRouter