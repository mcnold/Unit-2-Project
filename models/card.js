const mongoose = require('mongoose')
const { Schema , model } = mongoose

const cardSchema = new Schema({
  nhits: Number,
  cards: [{
        type: String,
        name_short: String,
        img: String,
        name: String,
        value: Number,
        value_int: Number,
        meaning_up: String,
        meaning_rev: String,
        desc: String

    }]
})

const Card = model('Card', userSchema)

module.exports = Card







