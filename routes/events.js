const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const eventsController = require('../controllers/events')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/newEvent', ensureAuth, eventsController.getNewEvent) 
router.post('/newEvent', upload.single('file'), eventsController.postNewEvent)
router.get('/event/:_id', eventsController.getEvent)
router.delete('/event/deleteEvent/:_id', eventsController.deleteEvent)
router.put('/event/postComment/:_id', eventsController.postComment)
router.put('/event/deleteComment/:_eventId/:_commentId', eventsController.deleteComment)
router.put('/event/addCommentLike/:_eventId/:_commentId', eventsController.addCommentLike)
router.put('/event/changeDate/:_id', eventsController.changeDate)
router.put('/event/sendInvite/:_id', eventsController.sendInvites)
router.put('/event/acceptInvite/:_id', eventsController.acceptInvite)
router.put('/event/declineInvite/:_id', eventsController.declineInvite)

module.exports = router