const express=require("express");

const { registerUser,loginUser, logout, createEvent} = require("../controllers/userController.js");
const { isAuthenticatedUser} = require("../middleware/auth");

const router=express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);
router.route("/home").get(isAuthenticatedUser);



router.route("/createevent").post(isAuthenticatedUser,createEvent);

 
module.exports=router;   


 
 

