const {googleusermodel}=require('../models/googleuser.model')
const jwt=require('jsonwebtoken');
const { emailmodel } = require('../../models/email.model');
async function googleusercontroller(req,res){
try {
    const {name,email}=req.body;
    if(name&&email){
        const check= await googleusermodel.findOne({email})
        if(check)
        {
            let token=jwt.sign({id:check['_id'],googleuser:true},process.env.jwt_key_user);
            return res.status(200).json({message:'user already exist',token:token,flag:true})
            
        }
        const data=await googleusermodel.create({name,email})
        let token=jwt.sign({id:data['_id'],googleuser:true},process.env.jwt_key_user);
        await emailmodel.create({email})
        return res.status(200).json({
            message:'successfully created',
            token:token,
            flag:true
        })
    }
    return res.status(404).json({
        message:'Invalid input',
        flag:false
    })
} catch (error) {
    console.log(error.message);
    return res.status(500).json({
        message:'Internal server error',
        flag:false
    })
}
}

module.exports={googleusercontroller}