const userRouter = require('express').Router()
const authController = require('../../controllers/auth.controller')



// route matches api/v1/auth/register
userRouter.post('/register', authController.register)

// route matches api/v1/auth/login
userRouter.post('/login', authController.login)

// route matches api/v1/auth/refresh-token
userRouter.post('/refresh-token', authController.refreshToken)


// route matches api/v1/auth/logout
userRouter.post('/logout', authController.logout)




module.exports = userRouter



