const User = require('../models/User')
const Event = require('../models/Event')

module.exports = {
    getProfile: async (req,res)=>{
        try {
            const userEvents = await Event.find({hostId: req.user._id})
    
            res.render('profile.ejs', {user: req.user, isLoggedIn: req.isAuthenticated(), userEvents: userEvents})
        } catch (err) {
            console.log(err)
        }
    }
}