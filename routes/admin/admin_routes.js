const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches api/v1/admin/

// fetching data
adminRouter.get('/get-subjects', adminController.getSubjects)
adminRouter.get('/get-students', adminController.getStudents)
adminRouter.get('/get-teachers', adminController.getTeachers)

adminRouter.post('/account-activate', adminController.activeAccount)


// control subjects
adminRouter.post('/add-subject', adminController.addSubject)
adminRouter.post('/update-subject-teacher', adminController.updateSubjectTeacher)


// deleting 
adminRouter.delete('/del-user', adminController.delUser)
adminRouter.delete('/del-subject', adminController.delSubject)


module.exports = adminRouter

