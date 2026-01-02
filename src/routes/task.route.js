import { Router } from 'express'
import { addTask,editTask } from '../controllers/task.controller.js' 
import { verifyJWT } from '../middleware/auth.middleware.js' 
const router = Router()
router.route('/addtask').post(verifyJWT,addTask)
router.route('/edittask/:taskId').patch(verifyJWT,editTask)

export default router