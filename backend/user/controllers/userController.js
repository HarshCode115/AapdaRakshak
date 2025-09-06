const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const User=require("../models/userModel.js");
const Event=require("../models/eventModel.js");
const sendToken=require("../utils/jwtToken.js");
const jwt=require('jsonwebtoken');
const { phonenomodel } = require("../../models/phoneno.model");
const { emailmodel } = require("../../models/email.model");



exports.registerUser= catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,mobile}=req.body;

    const user=await User.create({
        name,email,password,mobile
    }); 
    await phonenomodel.create({mobileno:mobile})
    await emailmodel.create({email:email})
    return res.status(200).json({
        flag:true,
        message:'User registered successfully'
    })

})


//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email or Password",400));
    }
    
    const user =await  User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("User doesn't exist",400));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password"));
    }
    const Userdetails=await User.findOne({email})
    let token=jwt.sign({id:Userdetails['_id'],googleauth:false},process.env.jwt_key_user)
    return res.status(200).json({
        token:token,
        flag:true,
        message:'Successfully logged in'
    })
 }); 


 //Logout User
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
});


// Create new Event 
exports.createEvent=catchAsyncErrors(async(req,res,next)=>{
    const {
        location,
        subject,
        radius,
        type,
        discrption,
        images,
    }= req.body;

    let cordinate={
        x:2,
        y:4
    };
    
    // var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + location ;
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => addressArr = data)
    //     .then(show => showAddress())
    //     .catch(err => console.log(err))    

    const event=await Event.create({
        location,
        subject,
        cordinate,
        radius,
        type,
        discrption,
        images,
        createdAt:Date.now(),
        user:req.user._id,
    })

    res.status(201).json({
        success:true,
        event
    })

});

exports.forgetPassword= catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findOne({email:req.body.email});
    
    if(!user){
        return next(new ErrorHander("User not found",404));
    }

    const resetToken= user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`http://localhost:3000/user/password/reset/${resetToken}`; 

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            // email:"pkg180901gmail.com",
            email:user.email,
            subject:`apda Password Recovery`,
            message,
        });
        
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        
        return next(new ErrorHander(error.message,500));
    }
});



// reset password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex"); 

    
    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    }); 
 
    if(!user){
        return next(new ErrorHander("Reset Password Token is invalide or has been expired", 400));
    }

    if(req.body.password!== req.body.confirmPassword){ 
        return next(new ErrorHander("Password does not Match",400));
    }
 
    user.password=req.body.password;  
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    
    res.status(201).json({
        success:true,
        message:"password reset successfully"
    })
})