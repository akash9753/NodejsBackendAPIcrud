// import mongoose
const mongoose = require('mongoose')

// create a model schema
const ProductSchema = new mongoose.Schema({
    productName:String,
    category:String,
    freshness:String,
    price:Number,
    comment:String,
    date:Date,
})

// create a model (collection) named User
// Note:
// - model name: User => collection name: users
module.exports = mongoose.model('angMatProduct', ProductSchema)