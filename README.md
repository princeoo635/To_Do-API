# To_Do-API
Tech Stack

1 Node.js
2 Express.js
3 MongoDB + Mongoose
4 JWT Authentication
5 bcrypt
6 Postman

Features

1 User registration & login
2 Create, read, update, delete notes
3 Mark note as completed
4 User-specific notes (authorization)
5 Token-based security

![ER Diagram](/images/to-do-er.png)

PROJECT STRUCTURE
src/
│── controllers/
│   ├── user.controller.js
│   └── task.controller.js
│
│── models/
│   ├── user.model.js
│   └── task.model.js
│
│── routes/
│   ├── user.route.js
│   └── task.route.js
│
│── middleware/
│   └── auth.middleware.js
│
│── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── AsyncHandler.js
│
│── app.js
│── index.js


Route and Functionality for Users
1. user registration ( post )
        /users/register
2. user login ( post )
        /users/login
3. user logout ( get )
        /users/logout

Route and Functionality for Tasks
1. add task ( post )
        /tasks/addtask
2. edit task ( patch )
        /tasks/edittask/taskId
3. delete task ( delete )
        /tasks/deletetask/taskId
4. Update status of task ( patch )
        /tasks/mark/taskId
5. get all task ( get )
        /tasks/tasks
6. get all task by  user ( get )
        /tasks/usertask

Run Locally on your System
git clone https://github.com/princeoo635/To_Do-API.git
cd todo-api
npm install
(set all env valiable mongoDB_URL, Port, Access_token secret and Access_token expiry)
npm run dev

URL https://to-do-api-euyr.onrender.com
