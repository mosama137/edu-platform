const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const config = require('../config/config')
const signAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            full_name: user.full_name,
            role: user.role,
            user_id: user.id,
        }
        const secret = config.accessTokenSecret
        const options = {
            expiresIn: '5m',
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

const refreshToken = () => {
    // 
}

const verifyToken = (req, res, next) => {
    token = req.cookies.token
    if (!token) return next(createError.Unauthorized())
    JWT.verify(token, config.accessTokenSecret, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized())
        }
        req.payload = payload
        next()
    })

}
module.exports = {
    signAccessToken,
    refreshToken,
    verifyToken
}