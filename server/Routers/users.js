const express = require('express');
const {getUsers} = require("../Controllers/users");
const usersRouter = express.Router();

usersRouter.get('/', getUsers)
usersRouter.get('/all', getUsers)

module.exports = usersRouter
