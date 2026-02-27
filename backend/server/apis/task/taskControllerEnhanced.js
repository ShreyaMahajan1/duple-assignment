const task = require('./taskModel')

// Add task with activity history
const addTask = async (req, res) => {
    try {
        let validation = ""
        if (!req.body.employeeId) validation += "employeeId is required "
        if (!req.body.title) validation += "title is required "
        if (!req.body.description) validation += "description is required "
        if (!req.body.deadline) validation += "deadline is required "
        
        if (validation) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Validation Error: " + validation
            })
        }

        const totalTask = await task.countDocuments()
        const obj = new task({
            autoId: totalTask + 1,
            projectId: req.body.projectId,
            boardId: req.body.boardId,
            employeeId: req.body.employeeId,
            subcategoryId: req.body.subcategoryId,
            title: req.body.title,
            description: req.body.description,
            attachment: req.file ? "task/" + req.file.filename : "task/noImg.jpg",
            deadline: req.body.deadline,
            priority: req.body.priority || 'Medium',
            progress: 'Todo',
            activityHistory: [{
                action: 'Task Created',
                performedBy: req.user?._id || req.body.createdBy,
                timestamp: new Date(),
                details: `Task "${req.body.title}" was created`
            }]
        })

        const result = await obj.save()
        const populatedResult = await task.findById(result._id)
            .populate('projectId')
            .populate('employeeId')
            .populate('subcategoryId')
            .populate('boardId')
        
        res.status(201).json({
            success: true,
            status: 201,
            message: "New task is added",
            data: populatedResult
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Get all tasks with pagination, search, and filters
const allTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        // Build query
        let query = { status: true }
        
        // Filter by project
        if (req.body.projectId || req.query.projectId) {
            query.projectId = req.body.projectId || req.query.projectId
        }
        
        // Filter by board
        if (req.body.boardId || req.query.boardId) {
            query.boardId = req.body.boardId || req.query.boardId
        }
        
        // Filter by employee
        if (req.body.employeeId || req.query.employeeId) {
            query.employeeId = req.body.employeeId || req.query.employeeId
        }
        
        // Filter by progress/status
        if (req.body.progress || req.query.progress) {
            query.progress = req.body.progress || req.query.progress
        }
        
        // Filter by priority
        if (req.body.priority || req.query.priority) {
            query.priority = req.body.priority || req.query.priority
        }
        
        // Text search in title and description
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ]
        }
        
        // Filter by due date range
        if (req.query.dueDateFrom || req.query.dueDateTo) {
            query.deadline = {}
            if (req.query.dueDateFrom) {
                query.deadline.$gte = new Date(req.query.dueDateFrom)
            }
            if (req.query.dueDateTo) {
                query.deadline.$lte = new Date(req.query.dueDateTo)
            }
        }

        const total = await task.countDocuments(query)
        const tasks = await task.find(query)
            .populate('projectId')
            .populate('employeeId')
            .populate('subcategoryId')
            .populate('boardId')
            .populate('activityHistory.performedBy', 'name email')
            .populate('comments.userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "All tasks are loaded",
            data: tasks,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Update task with activity history
const updateTask = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Task's _id is required"
            })
        }

        const taskDoc = await task.findOne({ _id: req.body._id })
        if (!taskDoc) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Task does not exist"
            })
        }

        const changes = []
        
        if (req.body.projectId && req.body.projectId !== taskDoc.projectId?.toString()) {
            taskDoc.projectId = req.body.projectId
            changes.push('project')
        }
        if (req.body.boardId && req.body.boardId !== taskDoc.boardId?.toString()) {
            taskDoc.boardId = req.body.boardId
            changes.push('board')
        }
        if (req.body.employeeId && req.body.employeeId !== taskDoc.employeeId?.toString()) {
            taskDoc.employeeId = req.body.employeeId
            changes.push('assignee')
        }
        if (req.body.subcategoryId) {
            taskDoc.subcategoryId = req.body.subcategoryId
            changes.push('category')
        }
        if (req.body.title && req.body.title !== taskDoc.title) {
            taskDoc.title = req.body.title
            changes.push('title')
        }
        if (req.body.description && req.body.description !== taskDoc.description) {
            taskDoc.description = req.body.description
            changes.push('description')
        }
        if (req.file) {
            taskDoc.attachment = "task/" + req.file.filename
            changes.push('attachment')
        }
        if (req.body.deadline && req.body.deadline !== taskDoc.deadline) {
            taskDoc.deadline = req.body.deadline
            changes.push('deadline')
        }
        if (req.body.priority && req.body.priority !== taskDoc.priority) {
            taskDoc.priority = req.body.priority
            changes.push('priority')
        }
        if (req.body.progress && req.body.progress !== taskDoc.progress) {
            taskDoc.progress = req.body.progress
            changes.push('status')
        }

        // Add activity history
        if (changes.length > 0) {
            taskDoc.activityHistory.push({
                action: 'Task Updated',
                performedBy: req.user?._id || req.body.updatedBy,
                timestamp: new Date(),
                details: `Updated: ${changes.join(', ')}`
            })
        }

        const updatedTask = await taskDoc.save()
        const populatedTask = await task.findById(updatedTask._id)
            .populate('projectId')
            .populate('employeeId')
            .populate('subcategoryId')
            .populate('boardId')
            .populate('activityHistory.performedBy', 'name email')
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "Task is updated",
            data: populatedTask
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Add comment to task
const addComment = async (req, res) => {
    try {
        if (!req.body.taskId) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Task ID is required"
            })
        }
        if (!req.body.comment) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Comment is required"
            })
        }

        const taskDoc = await task.findOne({ _id: req.body.taskId })
        if (!taskDoc) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Task not found"
            })
        }

        taskDoc.comments.push({
            userId: req.user?._id || req.body.userId,
            comment: req.body.comment,
            createdAt: new Date()
        })

        taskDoc.activityHistory.push({
            action: 'Comment Added',
            performedBy: req.user?._id || req.body.userId,
            timestamp: new Date(),
            details: 'Added a comment'
        })

        await taskDoc.save()
        const populatedTask = await task.findById(taskDoc._id)
            .populate('comments.userId', 'name email')
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "Comment added successfully",
            data: populatedTask
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Update task progress by employee
const taskProgress = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "task_id is required"
            })
        }

        const taskDetail = await task.findOne({ _id: req.body._id })
        if (!taskDetail) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Task does not exist"
            })
        }

        const oldProgress = taskDetail.progress
        if (req.body.progress) {
            taskDetail.progress = req.body.progress
            
            taskDetail.activityHistory.push({
                action: 'Status Changed',
                performedBy: req.user?._id || req.body.userId,
                timestamp: new Date(),
                details: `Status changed from ${oldProgress} to ${req.body.progress}`
            })
        }

        const updatedProgress = await taskDetail.save()
        const populatedTask = await task.findById(updatedProgress._id)
            .populate('projectId')
            .populate('employeeId')
            .populate('activityHistory.performedBy', 'name email')
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "Task progress is updated",
            data: populatedTask
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

module.exports = { addTask, allTask, updateTask, addComment, taskProgress }
