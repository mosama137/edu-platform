const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches api/v1/admin/

// fetching data
adminRouter.get('/subjects', adminController.getSubjects)
adminRouter.get('/get-students', adminController.getStudents)
adminRouter.get('/get-teachers', adminController.getTeachers)



// control 
adminRouter.post('/account-activate', adminController.activeAccount)
adminRouter.post('/add-subject', adminController.addSubject)
adminRouter.post('/update-subject-teacher', adminController.updateSubjectTeacher)
adminRouter.delete('/del-subject', adminController.delSubject)


module.exports = adminRouter

