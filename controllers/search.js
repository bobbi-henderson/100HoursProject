const Event = require('../models/Event')

module.exports = {
    search: async (req, res) =>{
        try {
            const events = await Event.find({$text:{$search: req.query.search}})

            res.render('search.ejs', {events: events, user: req.user, isLoggedIn: req.isAuthenticated()})
        } catch (err) {
            console.log(err)
        }
    }
}