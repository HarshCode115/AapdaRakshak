const express=require('express')
const checkuserroute=express.Router()
const {checkusercontroller}=require('../controllers/checkuser.controller')
checkuserroute
.route('/checkuser')
.post(checkusercontroller)

module.exports={checkuserroute}