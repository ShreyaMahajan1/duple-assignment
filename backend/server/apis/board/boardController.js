const Board = require('./boardModel')

// Add Board
const addBoard = async (req, res) => {
    try {
        let validation = ""
        if (!req.body.name) validation += "Board name is required. "
        if (!req.body.projectId) validation += "Project ID is required. "
        
        if (validation) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Validation Error: " + validation
            })
        }

        const total = await Board.countDocuments()
        const board = new Board({
            autoId: total + 1,
            name: req.body.name,
            description: req.body.description || "",
            projectId: req.body.projectId,
            createdBy: req.body.createdBy
        })

        const result = await board.save()
        res.status(201).json({
            success: true,
            status: 201,
            message: "Board created successfully",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Get all boards
const allBoards = async (req, res) => {
    try {
        req.body.status = true
        const boards = await Board.find(req.body)
            .populate('projectId')
            .populate('createdBy')
            .sort({ createdAt: -1 })
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "Boards loaded successfully",
            data: boards
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Get single board
const singleBoard = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Board ID is required"
            })
        }

        const board = await Board.findOne({ _id: req.body._id })
            .populate('projectId')
            .populate('createdBy')
        
        if (!board) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Board not found"
            })
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: "Board loaded successfully",
            data: board
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Update board
const updateBoard = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Board ID is required"
            })
        }

        const board = await Board.findOne({ _id: req.body._id })
        if (!board) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Board not found"
            })
        }

        if (req.body.name) board.name = req.body.name
        if (req.body.description) board.description = req.body.description

        const updatedBoard = await board.save()
        res.status(200).json({
            success: true,
            status: 200,
            message: "Board updated successfully",
            data: updatedBoard
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

// Delete board (soft delete)
const deleteBoard = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Board ID is required"
            })
        }

        const board = await Board.findOne({ _id: req.body._id })
        if (!board) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Board not found"
            })
        }

        board.status = false
        const deletedBoard = await board.save()
        
        res.status(200).json({
            success: true,
            status: 200,
            message: "Board deleted successfully",
            data: deletedBoard
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

module.exports = { addBoard, allBoards, singleBoard, updateBoard, deleteBoard }
