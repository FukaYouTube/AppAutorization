const { Schema } = require('mongoose')

let user = new Schema({
    username: { type: String, required: true },
    password: { type: String },
    first_name: { type: String },
    email: { type: String },
    friends: [],
    subscrubers: [],
    about_us: { type: String },
    tags: [],
    date: { type: Date, default: Date.now }
})

module.exports = user