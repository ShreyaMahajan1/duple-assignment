const task = require('./taskModel')


// add tasks
const addTask = async (req, res) => {
    let validation = ""
    // if(!req.body.projectId){
    //     validation += "projectId is required "
    // }
    if (!req.body.employeeId) {
        validation += "employeeId is required "
    }
    if (!req.body.subcategoryId) {
        validation += "subcategoryId is required "
    }
    if (!req.body.title) {
        validation += "title is required "
    }
    if (!req.body.description) {
        validation += "description is required "
    }
    if (!req.file) {
        validation += "attachment is required "
    }
    if (!req.body.deadline) {
        validation += "deadline is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        let totalTask = await task.countDocuments()
        let obj = new task()
        obj.autoId = totalTask + 1
        obj.projectId = req.body.projectId
        obj.employeeId = req.body.employeeId
        obj.subcategoryId = req.body.subcategoryId
        obj.title = req.body.title
        obj.description = req.body.description
        obj.attachment = "task/"+req.file.filename
        obj.deadline = req.body.deadline

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New task is added",
                    data: result
                })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}



//find all tasks
const allTask = (req, res) => {
    req.body.status = true
    task.find(req.body).sort({createdAt: -1}).populate("projectId") .populate("employeeId").populate('subcategoryId').exec()

        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All tasks are loaded",
                data: result
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}


//find single task
const singleTask = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "task _id is requied"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation error: " + validation
        })
    }   
    else {
        task.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Task does not exists"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Task Loaded",
                        data: result
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

//update task by admin
const updateTask = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "Task's _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        task.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Task does not exist"
                    })
                }
                else {
                    if (!!req.body.projectId) {
                        result.projectId = req.body.projectId
                    }
                    if (!!req.body.employeeId) {
                        result.employeeId = req.body.employeeId
                    }
                    if (!!req.body.subcategoryId) {
                        result.subcategoryId = req.body.subcategoryId
                    }
                    if (!!req.body.title) {
                        result.title = req.body.title
                    }
                    if (!!req.body.description) {
                        result.description = req.body.description
                    }
                    if (!!req.file) {
                        result.attachment = "task/"+req.file.filename
                    }
                    if (!!req.body.deadline) {
                        result.deadline = req.body.deadline
                    }
                    if (!!req.body.progress) {
                        result.progress = req.body.progress
                    }

                    result.save()
                        .then((updatedTask) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Task is updated",
                                data: updatedTask
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

// delete task
const deleteTask = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "Task's _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        task.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Task does not exist"
                    })
                }
                else {
                    result.status = false
                    result.save()
                        .then((deletedTask) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Task is deleted",
                                data: deletedTask
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


//update task progress by employee
const taskProgress = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "task_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        task.findOne({ _id: req.body._id }).exec()
            .then((taskDetail) => {
                if (taskDetail == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Task does not exist"
                    })
                }
                else {
                    if (!!req.body.progress){
                        taskDetail.progress = req.body.progress
                    }
                    taskDetail.save()
                        .then((updatedProgress) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Task progress is updated",
                                data: updatedProgress
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}
module.exports = { addTask, allTask, singleTask, updateTask, deleteTask, taskProgress }