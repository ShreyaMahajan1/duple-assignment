const express = require('express')
const app = express()
const database = require('./server/config/promanger(db)')
const seed = require('./server/config/seed')
const cors = require('cors')

app.use(cors())
app.use(express.static('./server/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }));
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})

const adminRout = require('./server/routes/adminRoutes')
app.use('/admin', adminRout)
const employeeRout = require('./server/routes/employeeRoutes')
app.use('/employee', employeeRout)

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error Occured", err)
    }
    else {
        console.log("Server is running on port", PORT)
    }
})