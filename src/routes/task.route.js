import { Router } from 'express'
import { addTask,editTask,deleteTask,statusUpdate,allTask,userTask } from '../controllers/task.controller.js' 
import { verifyJWT } from '../middleware/auth.middleware.js' 
const router = Router()
router.route('/addtask').post(verifyJWT,addTask)
router.route('/edittask/:taskId').patch(verifyJWT,editTask)
router.route('/deletetask/:taskId').delete(verifyJWT,deleteTask)
router.route('/mark/:taskId').patch(verifyJWT,statusUpdate)
router.route('/tasks').get(verifyJWT,allTask)
router.route('/userTask').get(verifyJWT,userTask)
export default router