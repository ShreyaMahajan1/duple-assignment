const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('board', boardSchema)
