const express = require('express')
const authRouter = express.Router()
const { registrationUser, loginUser } = require('../Controllers/auth')
const { userNameCheck } = require('../Midlleware/user')

authRouter.post('/login', userNameCheck, loginUser)

authRouter.post('/registration', userNameCheck, registrationUser)

module.exports = authRouter
