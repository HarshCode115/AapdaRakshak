const express=require('express');
const { validation } = require('../auth/checklogin');

const mains=express.Router();

mains.route('/').post(validation,(req,res)=>{
    console.log(req.body);
    res.json({
        msg:'yes'
    })
})
module.exports={mains}