const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.JWT_SECRET || "29834hdiusefh&%&^%#&^jshd8w94323J*#("

const check = (req, res, next) => {
    let token = req.headers['authorization']

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    if (!!token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        success: false,
                        status: 401,
                        message: "Token expired"
                    })
                }
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Unauthorised access"
                })
            }
            else {
                req.user = decoded
                next()
            }
        })
    }
    else {
        res.status(403).json({
            success: false,
            status: 403,
            message: "No Token Found"
        })
    }
}

module.exports = check