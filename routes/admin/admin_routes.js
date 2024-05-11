const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches api/v1/admin/

// fetching data
adminRouter.get('/subjects', adminController.getSubjects)
adminRouter.get('/students', adminController.getStudents)
adminRouter.get('/teachers', adminController.getTeachers)

adminRouter.post('/activation', adminController.activeAccount)


// control subjects
adminRouter.post('/subject', adminController.addSubject)
adminRouter.post('/subject-teacher', adminController.updateSubjectTeacher)


// deleting 
adminRouter.delete('/user', adminController.delUser)
adminRouter.delete('/subject', adminController.delSubject)


module.exports = adminRouter

