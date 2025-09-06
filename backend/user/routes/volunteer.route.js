const express=require('express')
const { checkvolunteercontroller } = require('../controllers/checkvolunter.controller')
const {validation}=require('../helper/checklogin')
const volunteerroute=express.Router()

volunteerroute
.route('/volunteer')
.post(validation,checkvolunteercontroller)


module.exports={volunteerroute}