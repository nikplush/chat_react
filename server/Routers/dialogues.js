const express = require('express');
const dialoguesRouter = express.Router();
const {newDialog, getMessage} = require('../Controllers/dialogues')

dialoguesRouter.post('/', newDialog)
dialoguesRouter.get('/messages', getMessage)
dialoguesRouter.post('/messages', getMessage)

module.exports = dialoguesRouter
