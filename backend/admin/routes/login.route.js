const express=require('express');
const loginroute=express.Router();
const {loginadmin}=require('../controllers/login.controller')
loginroute
.route('/login')
.post(loginadmin)

module.exports={
    loginroute
}