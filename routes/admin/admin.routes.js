const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches /api/v1/admin/

// ---------Member Page --------------------------------------
adminRouter.get('/students', adminController.getStudents)
adminRouter.get('/teachers', adminController.getTeachers)
adminRouter.post('/activation', adminController.activeAccount)
adminRouter.delete('/user', adminController.delUser)

// -----------------------------------------------------------

//---------------------Courses Page-------------------------------
adminRouter.get('/courses', adminController.getCourses)
adminRouter.post('/course', adminController.addOrUpdateCourse)
adminRouter.delete('/course', adminController.delCourse)
// -----------------------------------------------------------

//---------------------Payments-------------------------------
adminRouter.get('/payment', adminController.getPayment)
adminRouter.post('/payment', adminController.addOrUpdatePayment)
adminRouter.delete('/payment', adminController.delPayment)
// -----------------------------------------------------------



module.exports = adminRouter

