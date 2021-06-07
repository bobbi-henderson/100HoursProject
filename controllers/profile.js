const User = require('../models/User')
const Event = require('../models/Event')

module.exports = {
    getProfile: async (req,res)=>{
        try {
            const userEvents = await Event.find({hostId: req.user._id})
            const attending = await Event.find({attendees: {$all: [req.user.email]}})
    
            res.render('profile.ejs', {user: req.user, isLoggedIn: req.isAuthenticated(), userEvents: userEvents, attending: attending})
        } catch (err) {
            console.log(err)
        }
    }
}