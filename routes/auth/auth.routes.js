const authRouter = require('express').Router()
const authController = require('../../controllers/auth.controller')



// route matches api/v1/auth/register
authRouter.post('/register', authController.register)

// route matches api/v1/auth/login
authRouter.post('/login', authController.login)

// route matches api/v1/auth/refresh-token
authRouter.post('/refresh-token', authController.refreshToken)


// route matches api/v1/auth/logout
authRouter.post('/logout', authController.logout)




module.exports = authRouter



