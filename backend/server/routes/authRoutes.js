const router = require('express').Router()
const { refreshToken, logout } = require('../apis/auth/authController')

// Refresh token endpoint
router.post('/refresh', refreshToken)

// Logout endpoint
router.post('/logout', logout)

module.exports = router
