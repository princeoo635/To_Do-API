import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'

//Register User
const registerUser = AsyncHandler(async (req,res) => {
    console.log(req.body);
    
    const { Name, email, password, mobileNo} = req.body;
   if (!Name || !email || !password){
        throw new ApiError(400,"Name, Email and Password are required");   
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }
    const user=await User.create({
        Name,
        email,
        password,
        mobileNo
    })
    const createdUser = await User.findById(user._id).select("-password");
    res.status(201)
    .json(
        new ApiResponse(201,createdUser,"User successfully registered.")
    )
})

export {
    registerUser
}