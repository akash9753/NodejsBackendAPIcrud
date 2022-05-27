// import mongoose
const mongoose = require('mongoose')

// create a model schema
const UserSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    gender:String,
    State:String,
    mobile:String,
})

// create a model (collection) named User
// Note:
// - model name: User => collection name: users
module.exports = mongoose.model('User', UserSchema)