const express=require('express')
const Razorpay=require('razorpay');
const {createordercontroller}=require('../controllers/createorder.controller')
const createorderroute=express.Router();
createorderroute.use(express.json())
createorderroute.route('/createorder').post(createordercontroller)
module.exports={createorderroute}