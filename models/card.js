const mongoose = require('mongoose')
const { Schema , model } = mongoose

const cardSchema = new Schema({
        deck: String,
        type: String,
        img: String,
        name: String,
        value: Number,
        value_int: Number,
        suit: String,
        meaning_up: String,
        meaning_rev: String,
        desc: String


})

const Card = model('Card', cardSchema)

module.exports = Card







