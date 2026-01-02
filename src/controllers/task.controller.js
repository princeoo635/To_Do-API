import { Task } from '../models/task.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'

//add task
const addTask = AsyncHandler ( async (req,res) => {
    const { description } = req.body;
    if( !description?.trim() ){
        throw new ApiError(400,"Task details is not given.")
    }
    const task = await Task.create({
        description,
        taskCreator:req.user._id
    })
    res.status(200).json(new ApiResponse(200,task,"Task was successfully added."))
})

export {
    addTask,
}