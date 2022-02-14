const express = require('express')
const utils = require('../utils')
const Product = require('../models/product')


const router = express.Router()

router.post('/productCreate', (request, response) => {
    const { productName, category, freshness, price, comment, date } = request.body
  
    // create an instance of product model
    const product = new Product()
    product.productName = productName
    product.category = category
    product.freshness = freshness
    product.price = price
    product.comment = comment
    product.date = date
    
  
    // save the product instance to create a document inside the product collection
    product.save((error, dbResult) => {
       response.send(utils.createResult(error, dbResult))
      
    })
  })


  router.get('/all', (request, response) => {
    Product.find({},{ __v:0,password:0, isDeleted:0 }).exec((error, products) => {
      response.send(utils.createResult(error, products))
    
    })
  })
  
  router.get('/:id', (request, response) => {
    const { id } = request.params
    console.log(id)
    Product.findOne({ _id: id })
      .exec((error, product) => {
        response.send(utils.createResult(error, product))
      })
  })

  router.put('/update/:id', (request, response) => {
    const { id } = request.params
    console.log(id)
    const { productName, category, freshness, price, comment, date} = request.body
    console.log(request.body)
    Product.findOne({ _id: id }).exec((error, product) => {
      if (error) {
        response.send(utils.createError(error))
      } else if (!product) {
        response.send(utils.createError('product does not exist'))
      } else {
        console.log(product)
        product.productName = productName
        product.category = category
        product.freshness = freshness
        product.price = price
        product.comment = comment
        product.date = date
        product.save((error, product) => {
          response.send(utils.createResult(error, product))
        })
      }
    })
  })

  router.delete('/delete/:id', (request, response) => {
    const { id } = request.params
    console.log(id)
    Product.remove({ _id: id }).exec((error, dbResult) => {
        response.send(utils.createResult(error, dbResult))
          })
  })
  

module.exports = router