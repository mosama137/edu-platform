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
// ----------------------Levels------------------------------
adminRouter.get('/pay/level', adminController.getPayLevels)
adminRouter.post('/pay/level', adminController.addOrUpdatePayLevel)
adminRouter.delete('/pay/level', adminController.delPayLevel)
// ----------------------Methods-----------------------------
adminRouter.get('/pay/method', adminController.getPayMethod)
adminRouter.post('/pay/method', adminController.addOrUpdatePayMethod)
adminRouter.delete('/pay/method', adminController.delPayMethod)
adminRouter.get('/pay/history', adminController.getPayhistory)
adminRouter.post('/pay/history', adminController.submitPayment)

// -----------------------------------------------------------



module.exports = adminRouter

