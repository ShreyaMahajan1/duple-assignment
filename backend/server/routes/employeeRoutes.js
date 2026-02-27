const rout = require('express').Router()
const multer = require('multer')
const projectController = require("../apis/project/projectController")
const employeeController = require('../apis/employee/employeeController')
const userController = require('../apis/user/userController')
const categoryController = require("../apis/category/categoryController")
const subcatController = require('../apis/subCategory/subcatController')
const teamController = require('../apis/projectTeam/teamController')
const taskController = require('../apis/task/taskController')
const taskControllerEnhanced = require('../apis/task/taskControllerEnhanced')
const boardController = require('../apis/board/boardController')
const submitController = require('../apis/submit/submitController')
const chatController = require('../apis/chat/chatController')
const dashboardController = require('../apis/dashboard/dashboardController')
const coinController = require('../apis/coins/coinsController')
//login router
rout.post('/login', userController.login)
rout.use(require('../middleware/tokenChecker'))

//change password
rout.post('/changepassword', userController.changePass)
rout.post('/dashboard', dashboardController.empDashboard)


//update employee profile
const employeeStorage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb: (null, "server/public/employee")
    },
    filename : (req, file, cb)=>{
        cb : (null, Date.now + "-" + file.fieldname + "-" + file.originalname)
    }
})
const employeeUpdate = multer({storage: employeeStorage})

rout.post('/profile/update', employeeUpdate.single("picture"), employeeController.updateProfile)

rout.post('/coins/all',coinController.allCoins )


//category
rout.post('/category/all', categoryController.allCategory)
rout.post('/category/single', categoryController.singleCategory)


//sub-category
rout.post('/subcategory/all', subcatController.allSubcat)
rout.post('/subcategory/single', subcatController.singleSubcat)

rout.post('/single', employeeController.singleEmployee)
//project
rout.post('/project/all', projectController.allProjects)
rout.post('/project/single', projectController.singleProject)


//project teams
rout.post('/projectteam/all', teamController.allTeams)
rout.post('/projectteam/single', teamController.singleTeam)


//task 
rout.post('/task/all', taskController.allTask)
rout.get('/task/all', taskControllerEnhanced.allTask) // Enhanced with pagination & filters
rout.post('/task/single', taskController.singleTask)
rout.post('/task/progress', taskController.taskProgress)
rout.post('/task/comment', taskControllerEnhanced.addComment) // Add comment to task


//board
rout.post('/board/all', boardController.allBoards)
rout.post('/board/single', boardController.singleBoard)


//work submittion
const submitStorage = multer.diskStorage({
    destination : (req, file ,cb)=>{
        cb(null, "server/public/submit")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"-"+file.fieldname+"-"+file.originalname)
    }
})
const submitUploads = multer({storage: submitStorage})


rout.post('/work/submit', submitUploads.single('file'), submitController.upload)
rout.post('/work/update',submitUploads.single('file'), submitController.update)


//chat 
rout.post('/chat/add', chatController.add)
rout.post('/chat/all', chatController.all)
rout.post('/chat/single', chatController.single)
rout.post('/chat/delete', chatController.delMessage)


rout.all('*', (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = rout
