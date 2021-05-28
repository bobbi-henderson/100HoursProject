const Event = require('../models/Event')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getNewEvent: (req,res)=>{
        res.render('newEvent.ejs', {user: req.user, isLoggedIn: req.isAuthenticated()})
    },
    postNewEvent: async (req,res)=>{
        try {
            const result = await cloudinary.uploader.upload(req.file.path)

            await Event.create({
                host: {first: req.user.first, last: req.user.last, userName: req.user.userName},
                hostId: req.user._id,
                name: req.body.name,
                image: result.secure_url,
                cloudinaryID: result.public_id,
                desc: req.body.desc,
                date: req.body.date,
                public: (req.body.public === 'on'),
                location: req.body.location,
            })
            res.redirect('/profile')
        } catch (err) {
            console.log(err)
        }
    }, 
    getEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.params._id)
            
            const user = req.user

            res.render('event.ejs', {event: event, user: user, isLoggedIn: req.isAuthenticated()})
        } catch (err) {
            console.log(err)
        }
    },
    deleteEvent: async (req, res) =>{
        try {
            const event = await Event.findById({_id: req.params._id})
            await cloudinary.uploader.destroy(event.cloudinaryID)
            await Event.deleteOne({_id: req.params._id})

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    },
    changeDate: async (req,res) =>{
        try {
            await Event.findOneAndUpdate({_id: req.params._id}, {
                $set: {
                    date: req.body.date
                }
            })
            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    },
    sendInvites: async (req, res) =>{
        try {
            const newInvites = (req.body.invites).split(',').filter((email)=>{return email.match(/\S+@\S+\.\S+/g)}).map((email)=>{return email.trim()})
            console.log(newInvites)
            
            await Event.findOneAndUpdate({_id: req.params._id}, {
                $addToSet: {
                    invited: newInvites
                }
            })

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    },
    acceptInvite: async (req, res) =>{
        try {
            await Event.findOneAndUpdate({_id: req.params._id}, {
                $pull: {
                    invited: req.user.email
                }, 
                $addToSet: {
                    attendees: req.user.email
                }
            })

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    },
    declineInvite: async (req, res) =>{
        try {
            await Event.findOneAndUpdate({_id: req.params._id}, {
                $pull: {
                    invited: req.user.email
                }
            })

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    },
    postComment: async (req, res) =>{
        try {
            await Event.findOneAndUpdate({_id: req.params._id},{
                $push: {comments: {
                    userId: req.user._id,
                    username: req.user.userName,
                    content: req.body.content
                }}
            })

            const event = Event.findById({_id: req.params._id})


            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    }, 
    deleteComment: async (req, res) =>{
        try {
            await Event.findOneAndUpdate({_id: req.params._eventId},{
                $pull: {comments: {
                    _id: req.params._commentId
                }}
            })

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    }, 
    addCommentLike: async (req,res)=>{
        try {
            await Event.updateOne({_id: req.params._eventId, 'comments._id': req.params._commentId},{
                $inc:{'comments.$.likes': +1}})

            res.redirect('back')
        } catch (err) {
            console.log(err)
        }
    }
}