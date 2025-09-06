const express=require('express')
const { validation } = require('../auth/checklogin')
const {getfund,postfundres}=require('../controllers/fund.controller')
const getfundroute=express.Router()

getfundroute
.route('/getfund')
.post(validation,getfund)


getfundroute
.route('/postfundres')
.post(validation,postfundres)
module.exports={getfundroute}