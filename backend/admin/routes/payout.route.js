const express=require('express')
const { payout } = require('../controllers/payout.controller')

const payoutroute=express.Router()

payoutroute
.route('/payout')
.post(payout)

module.exports={payoutroute}