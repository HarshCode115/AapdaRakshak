const { sendemail } = require("../helper/mailsender");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User=require("../models/userModel.js");
const sendToken=require("../utils/jwtToken.js");
const checkusercontroller=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,mobile}=req.body;
    const check=await User.findOne({email})
    const check2=await User.findOne({mobile})
    console.log(check,check2);
    if(check||check2){
        return sendToken('User already exist with this email / mobile no',403,res)
    }
    var otp_value=Math.floor(100000+Math.random()*899999);
    console.log(otp_value)
    sendemail({otp:true,email,otp_value,subject:'Otp for register at Aptaguard'})
    return res.status(200).json({
        message:'otp has sended',
        otp_value,
        flag:true
    })
})

module.exports={checkusercontroller}