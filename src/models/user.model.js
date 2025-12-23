import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
 
const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
    }
},{timestamps:true})

//hashing password
userSchema.pre('save',async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password)
    next()
})

userSchema.method.isPasswordCorrect=
async function (password) {
    return bcrypt.compare(password,this.password)
    .then(validPassword=>validPassword)
    .catch(err=>{
        throw new ApiError(400,"Invalid password");
    })
}

userSchema.method.generateAccessToken = 
async function () {
    return jwt.sign({
        _id:this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
)
}

export const User = mongoose.model("User",userSchema)

