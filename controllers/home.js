const Event = require('../models/Event')

module.exports = {
    getIndex: async (req,res)=>{
        const events = await Event.find({public: true}).sort({attendees: -1})

        res.render('index.ejs', {events: events, user: req.user, isLoggedIn: req.isAuthenticated()})
    },
    getAbout: async (req, res)=> {
        res.render('about.ejs', {user: req.user, isLoggedIn: req.isAuthenticated()})
    }
}