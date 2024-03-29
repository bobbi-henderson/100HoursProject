const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) 
router.get('/about', homeController.getAbout)

module.exports = router