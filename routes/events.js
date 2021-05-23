const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const eventsController = require('../controllers/events')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/newEvent', ensureAuth, eventsController.getNewEvent) 
router.post('/newEvent', upload.single('file'), eventsController.postNewEvent)
router.get('/event/:_id', eventsController.getEvent)
router.put('/event/postComment/:_id', eventsController.postComment)
router.put('/event/deleteComment/:_eventId/:_commentId', eventsController.deleteComment)
router.put('/event/addCommentLike/:_eventId/:_commentId', eventsController.addCommentLike)

module.exports = router