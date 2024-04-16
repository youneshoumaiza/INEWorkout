const express = require('express')
const {
    loginUser,
    signupUser
} = require('../controller/userController')

const router = express.Router()

//login 
router.post('/login' ,loginUser )

//signup
router.post('/signup' , signupUser)

module.exports = router 