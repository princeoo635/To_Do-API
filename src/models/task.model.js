import mongoose from 'mongoose' 
const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        lowercase:true
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending"
    },
    taskCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)