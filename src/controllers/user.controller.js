import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'

//option
const option={
    httpOnly: true,
    secure: true
}
//Register User
const registerUser = AsyncHandler(async (req,res) => {
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
//Login Users
const loginUser = AsyncHandler( async (req,res) => {
    const { email,password } = req.body
    if(!email){
        throw new ApiError(400,"Email is required.")
    }
    const user = await User.findOne({ email })
    if( !user ){
        throw new ApiError(404," User does not exists.")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if( !isPasswordValid ){
        throw new ApiError(400,"Password is invalid.")
    }
    const accessToken = await user.generateAccessToken()
    const loggedInUser = await User.findById(user._id).select('-password')
    res.status(200)
    .cookie('accesstoken',accessToken,option)
    .json(
        new ApiResponse(200,loggedInUser,"user successfully logged in.")
    )
})
//logout
const logoutUser=AsyncHandler(
    async (req,res)=>{
        return res
        .status(200)
        .clearCookie("accesstoken",option)
        .json(new ApiResponse(200,{},"User logged out !!"))

    }
)

export {
    registerUser,
    loginUser,
    logoutUser
}