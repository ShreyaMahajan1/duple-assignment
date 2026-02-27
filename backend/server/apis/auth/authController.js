const jwt = require('jsonwebtoken')
const RefreshToken = require('./refreshTokenModel')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET || "29834hdiusefh&%&^%#&^jshd8w94323J*#("
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "98234jksdhf&*^%$#@!jkshdf8923J*#("
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h'
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d'

// Generate access token
const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

// Generate refresh token
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE })
}

// Refresh token endpoint
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Refresh token is required"
            })
        }

        // Verify refresh token
        jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Invalid or expired refresh token"
                })
            }

            // Check if refresh token exists in database
            const tokenDoc = await RefreshToken.findOne({ 
                token: refreshToken, 
                userId: decoded._id 
            })

            if (!tokenDoc) {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Refresh token not found"
                })
            }

            // Check if token is expired
            if (new Date() > tokenDoc.expiresAt) {
                await RefreshToken.deleteOne({ _id: tokenDoc._id })
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Refresh token expired"
                })
            }

            // Generate new access token
            const payload = {
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                userType: decoded.userType
            }

            const newAccessToken = generateAccessToken(payload)

            res.status(200).json({
                success: true,
                status: 200,
                message: "Token refreshed successfully",
                token: newAccessToken
            })
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Logout - remove refresh token
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Refresh token is required"
            })
        }

        await RefreshToken.deleteOne({ token: refreshToken })

        res.status(200).json({
            success: true,
            status: 200,
            message: "Logged out successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

module.exports = { 
    generateAccessToken, 
    generateRefreshToken, 
    refreshToken, 
    logout 
}
