const express=require('express');
const { validation } = require('../auth/checklogin.js');
const createadmin=express();
const {admincreation} =require('../controllers/createadmin.controller.js')
createadmin
.route('/createadmin')
.post(validation,admincreation)

module.exports={createadmin}