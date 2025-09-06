const express=require('express');
const {adminmodel}=require('../../models/admin.model');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
require('dotenv').config('../../')
const {validate_schema}=require('../helper/validate.schema')
async function loginadmin(req,res){
    try {
        const {email,password}=req.body; 
        console.log(req.body);
        const checkvaldiation=await validate_schema.validateAsync({email,password});
        const data=await adminmodel.findOne({email});
        if(data){
            let result=await bcrypt.compare(password,data.password)
            if(result){
                let token=jwt.sign({userid:data['_id']},process.env.jwt_key_admin);
                // console.log(token,data['_id']);
                return res.status(200).json({
                    message:'Successfully logged in',
                    token,
                    flag:true
                }) 
            }
            else{ 
                return res.status(404).json({
                    message:'Wrong password',
                    flag:false
                })
            }
        }
        else{
            return res.status(404).json({
                message:'Admin not exist',
                flag:false
            })
        }
    } catch (error) {
        if(error.isJoi===true){
            console.log(error)
            return res.status(422).json({
                message:'Invalid admin/password',
                flag:false
            })
        }
        console.log(error.message);
        return res.status(500).json({
            message:'error at server',
            flag:false
        })
    }
}

module.exports={loginadmin}