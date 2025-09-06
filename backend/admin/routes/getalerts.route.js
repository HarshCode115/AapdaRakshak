const express=require('express')
const { validation } = require('../auth/checklogin')
const {getalerts,postalertrescont}=require('../controllers/adminalerts.controller')
const getalertroute=express.Router()

getalertroute
.route('/getalerts')
.post(validation,getalerts)


getalertroute
.route('/postalertres')
.post(postalertrescont)

module.exports={getalertroute}