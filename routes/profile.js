const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')

router.get('/profile', profileController.getProfile) 

module.exports = router