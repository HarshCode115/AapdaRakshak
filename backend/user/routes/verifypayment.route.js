const express=require('express')
const { verifypayment } = require('../controllers/verifypayment.controller')
const verifypaymentroute=express.Router()
verifypaymentroute.use(express.json())
verifypaymentroute
.route('/verifypayment')
.post(verifypayment)

module.exports={verifypaymentroute}