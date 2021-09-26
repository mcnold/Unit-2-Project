const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    phoneNumber: Number,
    email: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User