const express=require('express')
const {adminmodel}=require('../../models/admin.model');
const {validate_schema}=require('../helper/validate.schema')

async function admincreation(req,res){
    try {
        if(req.body.email&&req.body.password){
            const {email,password}=req.body;
            const checkvaldiation=await validate_schema.validate({email,password});
            const check=await adminmodel.findOne({email});
            if(check){
                    return res.status(409).json({
                        message:'admin already exist',
                        flag:false
                    })   
            }
            const result=await adminmodel.create({email,password});
            return res.status(200).json({
                message:'successfully created admin',
                flag:true
            })
        }
        else{
            
            return res.status(422).json({
                message:'email/password required',
                flag:false
            })
        }
    } catch (error) {
        if(error.isJoe===true){
            return res.status(422).json({
                message:'invalid email/password',
                flag:false
            })
        }
        console.log(error.message);
        return res.status(500).json({
            message:'internal server error',
            flag:false
        })
    }

}

module.exports={admincreation}