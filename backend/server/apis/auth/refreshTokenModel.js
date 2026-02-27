const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('refreshToken', refreshTokenSchema)
