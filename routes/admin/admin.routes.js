const adminRouter = require('express').Router()
const adminController = require('../../controllers/admin.controller')


// route matches /api/v1/admin/

//-------------------fetching data----------------------------
adminRouter.get('/students', adminController.getStudents)
adminRouter.get('/teachers', adminController.getTeachers)
// -----------------------------------------------------------

//-------------control members Activation---------------------
adminRouter.post('/activation', adminController.activeAccount)
// -----------------------------------------------------------

//---------------------subjects-------------------------------
adminRouter.get('/subject', adminController.getSubjects)
adminRouter.post('/subject', adminController.addOrUpdateSubject)
adminRouter.delete('/subject', adminController.delSubject)
// -----------------------------------------------------------

//---------------------Payments-------------------------------
adminRouter.get('/payment', adminController.getPayment)
adminRouter.post('/payment', adminController.addOrUpdatePayment)
adminRouter.delete('/payment', adminController.delPayment)
// -----------------------------------------------------------



// -------------------deleting Users--------------------------
adminRouter.delete('/user', adminController.delUser)
// -----------------------------------------------------------


module.exports = adminRouter

