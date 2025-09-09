const express = require('express');
const { createuseralert } = require('../controllers/alert.controller');
const { validation } = require('../helper/checklogin');

const alertRouter = express.Router();

// Route for users to submit alerts
alertRouter
    .route('/createalert')
    .post(validation, createuseralert);

module.exports = { alertRouter };
