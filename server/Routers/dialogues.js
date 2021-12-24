const express = require('express')
const dialoguesRouter = express.Router()
const { newDialog } = require('../Controllers/dialogues')

dialoguesRouter.post('/', newDialog)

module.exports = dialoguesRouter
