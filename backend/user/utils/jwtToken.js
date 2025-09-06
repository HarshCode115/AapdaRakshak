 //creating token and saving in cookie
 
 const sendToken=(message,statusCode,res)=>{
    // const token=user.getJWTToken();

    // //options for cookie
    // console.log()
    // let n=30
    // const options = {
    //     httpOnly:true,
    //     expires:new Date(
    //         Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
    //     )
    // };
   
    // res.status(statusCode).cookie("token",token,options).json({
    //     success:true,
    //     user,
    //     token,
    // });
    if(statusCode==200){
        return res.status(200).json({
            flag:true,
            message:message
        })
    }
    return res.status(statusCode).json({
        flag:false,
        message:message
    })
 }; 

 module.exports=sendToken;  