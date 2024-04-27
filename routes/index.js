const router = require('express').Router()

const authRouter = require('./auth/auth_routes')

// *-*-*-*-*-*-*-*-Based Role Routes*-*-*-*-*-*-*-**-*-*- 
const adminRouter = require('./admin/admin_routes')
// const studentRouter = require('./student/student.routes')
// const teacherRouter = require('./student/teacher.routes')
// *------------------------------------------------------
// *-*-*-*-*-*-*-*-*-*helpers-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const { verifyToken } = require('../helpers/access_token')
const verifyRole = require('../helpers/verify_role')
// *------------------------------------------------------



// route matches api/v1/auth/
router.use('/auth', authRouter)

// route matches api/v1/admin/
// router.use('/admin', verifyToken, verifyRole('admin'), adminRouter)
router.use('/admin', adminRouter)


// // route matches api/v1/student/
// router.use('/student', verifyToken, verifyRole('student'), studentRouter)

// // route matches api/v1/teacher/
// router.use('/teacher', verifyToken, verifyRole('teacher'), teacherRouter)



module.exports = router