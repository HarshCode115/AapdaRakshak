const nodemailer=require('nodemailer');
require('dotenv').config('../../');
var transport=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:'rg515139@gmail.com',
        pass:process.env.mailpass
    }
})


function sendemail(content){
    const {otp,otp_value,email,subject,alertcontent}=content
    mailoption.to=email
    if(otp){
        mailoption.subject=subject
        mailoption.html=`<div><h1>Hello User</h1><br/><h3 style="color:black">Welcome to AapdaRakshak.You otp to register for AptaGuard is <b style="color:darkblue">${otp_value}</b></h3>
        </div>`
    }
    else{
        mailoption.subject=subject
        mailoption.html=`<div><h1 style="color:black">Alert from AapdaRakshak.</h1><h2 style="color:darkblue">This is alert about ${alertcontent} </h2>
        </div>`
    }
    transport.sendMail(mailoption,(err,info)=>{
        if(err){
          console.log(err.message);
        }
        else{
            console.log(info.response);
        }
    })
}
var mailoption={
        from:'noreply@gmail.com',
}
module.exports={sendemail};