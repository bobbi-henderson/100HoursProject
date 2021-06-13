const User = require('../models/User')
const Event = require('../models/Event')

module.exports = {
    getProfile: async (req,res)=>{
        try {
            const userEvents = await Event.find({hostId: req.user._id})
            const attending = await Event.find({attendees: {$all: [req.user.email]}})
            const invited = await Event.find({invited: {$all: [req.user.email]}})
            const maybe = await Event.find({maybe: {$all: [req.user.email]}})
    
            res.render('profile.ejs', {user: req.user, isLoggedIn: req.isAuthenticated(), userEvents: userEvents, attending: attending, invited: invited, maybe: maybe})
        } catch (err) {
            console.log(err)
        }
    }
}