const router = require('express').Router()

const authRouter = require('./auth/auth.routes')

// *-*-*-*-*-*-*-*-Based Role Routes*-*-*-*-*-*-*-**-*-*- 
const adminRouter = require('./admin/admin.routes')
// const studentRouter = require('./student/student.routes')
const teacherRouter = require('./teacher/teacher.routes')
const studentRouter = require('./student/student.routes')

// *------------------------------------------------------
// *-*-*-*-*-*-*-*-*-*helpers-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const { verifyToken } = require('../helpers/access_token')
const verifyRole = require('../helpers/verify_role')
const upload = require('../helpers/upload.files')
// *------------------------------------------------------



// route matches /api/v1/auth/
router.use('/auth', authRouter)

// route matches /api/v1/admin/
// router.use('/admin', verifyToken, verifyRole('admin'), adminRouter)
router.use('/admin', adminRouter)

// route matches api/v1/teacher/
// router.use('/teacher', verifyToken, verifyRole('teacher'), teacherRouter)
router.use('/teacher', teacherRouter)

// route matches api/v1/student/
// router.use('/student', verifyToken, verifyRole('student'), studentRouter)
router.use('/student', studentRouter)

router.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });
});


module.exports = router