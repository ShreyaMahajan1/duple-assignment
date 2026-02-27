const rout = require('express').Router()
const multer = require('multer')
const categoryController = require('../apis/category/categoryController')
const projectController = require('../apis/project/projectController')
const userController = require('../apis/user/userController')
const subcatController = require('../apis/subCategory/subcatController')
const employeeController = require('../apis/employee/employeeController')
const taskController = require('../apis/task/taskController')
const taskControllerEnhanced = require('../apis/task/taskControllerEnhanced')
const boardController = require('../apis/board/boardController')
const teamController = require('../apis/projectTeam/teamController')
const coinsController = require('../apis/coins/coinsController')
const dashboardController = require('../apis/dashboard/dashboardController')
const submitController = require('../apis/submit/submitController')
const chatController = require('../apis/chat/chatController')

//login 
rout.post('/login', userController.login)

rout.post('/category/single', categoryController.singleCategory)
rout.post('/category/all', categoryController.allCategory)
rout.post('/subcategory/single', subcatController.singleSubcat)
rout.post('/subcategory/all', subcatController.allSubcat)
rout.use(require('../middleware/tokenChecker'))

//admin Dashboard
rout.post('/dashboard', dashboardController.adminDashboard)


//change password
rout.post('/changepassword', userController.changePass)


//view all users
rout.post('/allusers', userController.allUsers)

//employee (register, view all, view single, block&unblock) 
const employeeStorage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb(null, "server/public/employee")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"-"+ file.fieldname + "-" + file.originalname)
    }
})
const employeeRegister = multer({storage : employeeStorage})

rout.post('/employee/register', employeeRegister.single("picture"), employeeController.register)
rout.post('/employee/update', employeeRegister.single("picture"), employeeController.updateProfile)
rout.post('/employee/all', employeeController.allEmployee)
rout.post('/employee/single', employeeController.singleEmployee)
// rout.post('/employee/status', userController.changeStatus)           //work with user_id
rout.post('/employee/status', employeeController.deleteEmployee)           //work with user_id


//category 
rout.post('/category/add', categoryController.addCategory)
rout.post('/category/update', categoryController.updateCategory)
rout.post('/category/delete', categoryController.deleteCategory)


//sub-category 
rout.post('/subcategory/add', subcatController.addSubcat)
rout.post('/subcategory/update', subcatController.updateSubcat)
rout.post('/subcategory/delete', subcatController.deleteSubcat)


//project
const projectStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "server/public/project")
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname)
    }
})
const projectUpload = multer({storage : projectStorage})

rout.post('/project/add' , projectUpload.single('attachment'), projectController.addProject)
rout.post('/project/all', projectController.allProjects)
rout.post('/project/single', projectController.singleProject)
rout.post('/project/update', projectUpload.single('attachment'), projectController.updateProject)
rout.post('/project/delete', projectController.deleteProject)


//project team 
rout.post('/projectteam/add', teamController.addTeam)
rout.post('/projectteam/all', teamController.allTeams)
rout.post('/projectteam/single', teamController.singleTeam)
rout.post('/projectteam/update', teamController.updateTeam)
rout.post('/projectteam/delete', teamController.deleteTeam)


//task
const taskStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "server/public/task")
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname)
    }
})
const taskUpload = multer({storage : taskStorage})

rout.post('/task/add', taskUpload.single('attachment'), taskController.addTask)
rout.post('/task/all', taskController.allTask)
rout.get('/task/all', taskControllerEnhanced.allTask) // Enhanced with pagination & filters
rout.post('/task/single', taskController.singleTask)
rout.post('/task/update', taskUpload.single('attachment'), taskController.updateTask)
rout.post('/task/delete', taskController.deleteTask)
rout.post('/task/comment', taskControllerEnhanced.addComment) // Add comment to task


//board management
rout.post('/board/add', boardController.addBoard)
rout.post('/board/all', boardController.allBoards)
rout.post('/board/single', boardController.singleBoard)
rout.post('/board/update', boardController.updateBoard)
rout.post('/board/delete', boardController.deleteBoard)


//view submit work
rout.post('/work/all', submitController.allWork)
rout.post('/work/single', submitController.singleWork)


//chat
rout.post('/chat/add', chatController.add)
rout.post('/chat/all', chatController.all)
rout.post('/chat/single', chatController.single)
rout.post('/chat/delete', chatController.delMessage)


//coins
rout.post('/coin/add', coinsController.addCoin)


rout.all('*', (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = rout