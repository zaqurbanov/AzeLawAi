const multer = require('multer')

const express = require('express')
const LawController = require('./law.controller')
const lawRouter = express.Router()
const prefix = '/law'
const lawController = new LawController()
const upload = multer({dest:"uploads"})
lawRouter.post(prefix,upload.single("file"),lawController.addNewLaw)
lawRouter.get(prefix,lawController.findAll)
module.exports = lawRouter