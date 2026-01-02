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
    res.status(201).json(new ApiResponse(201,task,"Task was successfully added."))
})
//edit task
const editTask = AsyncHandler(async (req,res) => {
    const { taskId } = req.params
    if(!taskId){
        throw new ApiError(400,"task id is required.")
    }
    const { description } = req.body
    if(!description?.trim()){
        throw new ApiError(400,"edited task is requied.")
    }
    const task=await Task.findOneAndUpdate(
        { _id: taskId, taskCreator: req.user._id },
        {
            $set:{description}
        },
        {new:true}
    )
    if(!task){
        throw new ApiError(404,"task not found")
    }
    res.status(200).json(new ApiResponse(200,task,"task edited successfully."))
})
export {
    addTask,
    editTask
}