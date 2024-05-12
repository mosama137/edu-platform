const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches api/v1/admin/

//-------------------fetching data----------------------------
adminRouter.get('/students', adminController.getStudents)
adminRouter.get('/teachers', adminController.getTeachers)
// -----------------------------------------------------------

//-------------control members Activation---------------------
adminRouter.post('/activation', adminController.activeAccount)
// -----------------------------------------------------------

//---------------------subjects-------------------------------
adminRouter.get('/subject', adminController.getSubjects)
adminRouter.post('/subject', adminController.addSubject)
adminRouter.post('/subject-teacher', adminController.updateSubjectTeacher)
adminRouter.delete('/subject', adminController.delSubject)
// -----------------------------------------------------------

//---------------------Payments-------------------------------
adminRouter.get('/payment', adminController.getPaymentInfo)
adminRouter.post('/payment', adminController.addPaymentInfo)
adminRouter.delete('/payment', adminController.delPayment)
// -----------------------------------------------------------



// -------------------deleting Users--------------------------
adminRouter.delete('/user', adminController.delUser)
// -----------------------------------------------------------


module.exports = adminRouter

