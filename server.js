const express = require('express')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
    console.log('database connected')
})
db.on('error', (err) => { console.log('ERROR: ', err) })
db.on('connected', () => { console.log('mongo connected') })
db.on('disconnected', () => { console.log('mongo disconnected')})

// MIDDLEWARES

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json())
//SESSIONS

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here\'s SESSION SECRET')
console.log(SESSION_SECRET)

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use((req, res, next) => {
  res.locals.currentUser=req.session.currentUser
  console.log("app.use", req.session.currentUser)
  next()
})
app.get('/check-session-property', (req, res) => {
  if (req.session.someProperty) {
    res.send(req.session.someProperty)
  }else{
    res.send("we haven't set anything yet!")
  }
})
app.get('/set-session-property/:value', (req, res) => {
  res.session.someProperty = req.params.value
  res.redirect('/user/welcome')
})

app.get('/destroy-session', (req, res) => {
  req.session.destroy()
  res.redirect('/user')
})

app.get('/', (req, res) => {
  res.render('welcome.ejs')
})
// CONTROLLERS
//const userController = require('./controller/usercontroller')
//app.use('/user', userController)
const usersController = require('./controller/userscontroller')
const cardController = require('./controller/cardcontroller')
app.use('/user', usersController)
app.use('/card', cardController)

app.listen(process.env.PORT || 3000)
