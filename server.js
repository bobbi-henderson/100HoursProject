const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const PORT = 2121

require('dotenv').config({path: './config/.env'})

connectDB()

require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING})
    })
);

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/', authRoutes)

app.listen(process.env.PORT || PORT, ()=>{
    console.log('Server is running, you better catch it!')
})   