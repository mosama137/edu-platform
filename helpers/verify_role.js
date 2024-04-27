const createError = require('http-errors')

const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.payload.role === role) next()

        next(createError.Unauthorized())
    }
}
module.exports = verifyRole


