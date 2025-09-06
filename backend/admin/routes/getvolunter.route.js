const express=require('express')
const { validation } = require('../auth/checklogin')
const { getvolunteercontroller,postvolunteerres } = require('../controllers/getvolunteer.controller')
const getvolunteerroute=express.Router()

getvolunteerroute
.route('/getvolunteer')
.post(validation,getvolunteercontroller)


getvolunteerroute
.route('/postvolunteerres')
.post(postvolunteerres)
module.exports={getvolunteerroute}