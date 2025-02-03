

const express = require('express')
const AskController = require('./ask.controller')
const askRouter = express.Router()
const askPrefix = '/ask'
const askController = new AskController()

askRouter.post(askPrefix,askController.ask)





module.exports = askRouter  