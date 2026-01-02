import express from 'express'
import cookieParser from 'cookie-parser'
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'
import taskRouter from './routes/task.route.js'
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)


export {app}