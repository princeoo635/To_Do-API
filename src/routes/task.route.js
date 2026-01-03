import { Router } from 'express'
import { addTask,editTask,deleteTask } from '../controllers/task.controller.js' 
import { verifyJWT } from '../middleware/auth.middleware.js' 
const router = Router()
router.route('/addtask').post(verifyJWT,addTask)
router.route('/edittask/:taskId').patch(verifyJWT,editTask)
router.route('/deletetask/:taskId').delete(verifyJWT,deleteTask)

export default router