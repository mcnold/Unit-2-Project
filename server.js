const express = require('express')
const app = express()
const methodOverride = require('method-override')
const PORT = 3000


const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/basiccrud"
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

app.get('/')
// CONTROLLERS
//const userController = require('./controller/usercontroller')
//app.use('/user', userController)


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
  })

