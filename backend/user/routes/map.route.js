const express=require('express')
const maproute=express.Router()
const {getmapdetails}=require('../controllers/getmap.controller')
maproute
.route('/getmap')
.get(getmapdetails)

module.exports={maproute}