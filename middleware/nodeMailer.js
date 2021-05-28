const mailer = require('nodemailer')

require("dotenv").config({ path: "./config/.env" });

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
})

module.exports = transporter