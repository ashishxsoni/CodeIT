const express = require('express');
const router = express.Router();
const {signupValidation, loginValidation} = require("../middlewares/AuthValidation.js");
const {handleSignUp} = require("../controllers/signup.js");
const {handleLogin} = require("../controllers/login.js");
// const {handleLogOutPage} = require("../controllers/logout.js");

//Signup and login
router
.post("/signup" ,signupValidation , handleSignUp ) 
.post("/login" ,loginValidation, handleLogin); //or say signin

//Loogout remaining




module.exports =router;