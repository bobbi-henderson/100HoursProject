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
            console.log('')
        } catch (err) {
            console.log(err)
        }
    }, 
    getEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.params._id)
            
            res.render('event.ejs', {event: event, isLoggedIn: req.isAuthenticated()})
        } catch (err) {
            console.log(err)
        }
    }
}