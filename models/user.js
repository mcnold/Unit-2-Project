const mongoose = require('mongoose')
const { Schema , model } = mongoose
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring

const userSchema = new Schema({
  username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
})

const User = model('User', userSchema)

module.exports = User