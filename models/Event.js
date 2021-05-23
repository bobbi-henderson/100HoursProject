const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  host: {type: Object},
  hostId: {type: String},
  name: {type: String},
  image: {type: String},
  cloudinaryID: {type: String},
  invited: {type: Array, default: []},
  attendees: {type: Array, default: []},
  desc: {type: String},
  comments: [{
    userId: {type: String},
    username: {type: String},
    content: {type: String},
    date: {type: Date, default: Date.now},
    likes: {type: Number, default: 0}
  }],
  date: {type: Date, default: Date.now},
  public: {type: Boolean, default: true},
  location: {type: String}
})

module.exports = mongoose.model('Event', EventSchema)

