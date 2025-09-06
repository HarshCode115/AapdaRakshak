const express=require('express')
const { fundcontroller } = require('../controllers/fund.controller')
const {validation}=require('../../user/helper/checklogin')
const fundroute=express.Router()

fundroute
.route('/createfund')
.post(validation,fundcontroller)


module.exports={fundroute}