const express=require('express')
const googleuserroute=express.Router()
const {googleusercontroller}=require('../controllers/googleuser.controller')
googleuserroute
.route('/googleuser')
.post(googleusercontroller)

module.exports={googleuserroute}