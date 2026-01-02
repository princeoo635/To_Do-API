import { Router } from 'express'
import { addTask } from '../controllers/task.controller.js' 
import { verifyJWT } from '../middleware/auth.middleware.js' 
const router = Router()
router.route('/addtask').post(verifyJWT,addTask)

export default router