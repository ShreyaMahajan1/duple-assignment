const express = require('express')
const app = express()
const database = require('./server/config/promanger(db)')
const seed = require('./server/config/seed')
const cors = require('cors')
const errorHandler = require('./server/middleware/errorHandler')
const rateLimiter = require('./server/middleware/rateLimiter')
const { sanitizeInput } = require('./server/middleware/validator')
require('dotenv').config()

app.use(cors())
app.use(express.static('./server/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

// Apply rate limiting (increased for development)
app.use(rateLimiter(1000, 15 * 60 * 1000)) // 1000 requests per 15 minutes

// Apply input sanitization
app.use(sanitizeInput)

app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: "Welcome to ProManager API",
        version: "2.0.0"
    })
})

const adminRout = require('./server/routes/adminRoutes')
app.use('/admin', adminRout)

const employeeRout = require('./server/routes/employeeRoutes')
app.use('/employee', employeeRout)

// Auth routes for refresh token
const authRout = require('./server/routes/authRoutes')
app.use('/auth', authRout)

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "Route not found"
    })
})

// Error handling middleware (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error Occured", err)
    }
    else {
        console.log("Server is running on port", PORT)
    }
})