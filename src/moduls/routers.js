
const express = require('express')
const lawRouter = require('./law/law.router')
const askRouter = require('./ask/ask.router')
const router = express.Router()

router.use(lawRouter)
router.use(askRouter)

module.exports = router 