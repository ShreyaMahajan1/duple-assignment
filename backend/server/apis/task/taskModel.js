const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    projectId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'project' },
    boardId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'board' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'employee' },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'subcategory' },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    attachment: { type: String, default: "task/noImg.jpg" },
    deadline: { type: Date, default: null },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
    createdAt: { type: Date, default: Date.now },
    progress: { type: String, enum: ['Todo', 'In Progress', 'Done', 'Pending', 'Working', 'Complete'], default: 'Pending' },
    status: { type: Boolean, default: true },
    activityHistory: [{
        action: { type: String, default: "" },
        performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        timestamp: { type: Date, default: Date.now },
        details: { type: String, default: "" }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        comment: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now }
    }]
})

module.exports = mongoose.model('task', taskSchema)