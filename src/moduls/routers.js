
const express = require('express')
const lawRouter = require('./law/law.router')
const askRouter = require('./ask/ask.router')
const histroyRouter = require('./chatHistory/history.route')
const router = express.Router()

router.use(lawRouter)
router.use(askRouter)
router.use(histroyRouter)

module.exports = router 