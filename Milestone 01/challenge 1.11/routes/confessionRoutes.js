const express = require('express')
const router = express.Router()
const controller = require('../controllers/confessionController')

// route delegates request handling to controller to keep routing layer minimal and focused
router.post('/', controller.createConfession)

module.exports = router