const ErrorHander=require("../utils/errorhander.js");
const catchAsyncErrors=require("./catchAsyncErrors.js");
const jwt =require("jsonwebtoken");
const User=require("../models/userModel.js"); 

exports.isAuthenticatedUser= catchAsyncErrors(async(req,res,next)=>{
    const { token }= req.cookies;
    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401)); 
    }

    const decodeData= jwt.verify(token,process.env.jwt_key);
    
    req.user= await User.findById(decodeData.id);
    next();
})