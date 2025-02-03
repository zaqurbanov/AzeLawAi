

const express = require("express")
const HistoryController = require("./history.controller")
const histroyRouter = express.Router()
const prefix = '/history'
const histroyController = new HistoryController()
histroyRouter.get(`${prefix}/:session_id`,histroyController.findBySessionId)











module.exports = histroyRouter