const express = require('express')
const { getUsers, getUser } = require('../Controllers/users')
const usersRouter = express.Router()

usersRouter.get('/', getUser)
usersRouter.get('/all', getUsers)

module.exports = usersRouter
