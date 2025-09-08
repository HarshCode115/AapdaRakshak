const express=require('express')
const { createadminalert, getalerts,updateadminalert, deletealert, postalertrescont} = require('../controllers/adminalerts.controller')
const {validation}=require('../auth/checklogin')

const adminalertroute=express.Router()

adminalertroute
.route('/createadminalert')
.post(validation,createadminalert)

adminalertroute
.route('/getalerts')
.post(validation,getalerts)

adminalertroute
.route('/updatealert')
.post(validation,updateadminalert)

adminalertroute
.route('/deletealert')
.post(validation,deletealert)

adminalertroute
.route('/approvealert')
.post(validation,postalertrescont)

module.exports={adminalertroute}