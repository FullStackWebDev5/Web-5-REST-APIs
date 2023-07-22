const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))

app.set('view engine', 'ejs')

const Product = mongoose.model('Product', {
  title: String,
  description: String,
  seller: String,
  price: Number,
  image: String,
  rating: Number
})

app.get('/', (req, res) => {
  res.json({
    status: 'SUCCESS',
    message: 'All good!'
  })
})

// GET /products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json({
      status: 'SUCCESS',
      data: products
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: 'Something went wrong!'
    })
  }
})

// POST /products
app.post('/products', async (req, res) => {
  try {
    const { title, description, image, seller, price, rating } = req.body
    await Product.create({ 
      title, 
      description, 
      image, 
      seller, 
      price, 
      rating 
    })
    res.json({
      status: 'SUCCESS',
      message: 'Product created successfully!'
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: 'Something went wrong!'
    })
  }
})

// PATCH /products/:id
app.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, image, seller, price, rating } = req.body
    await Product.findByIdAndUpdate(id, { 
      title, 
      description, 
      image, 
      seller, 
      price, 
      rating 
    })
    res.json({
      status: 'SUCCESS',
      message: 'Product updated successfully!'
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: 'Something went wrong!'
    })
  }
})

// DELETE /products/:id
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.json({
      status: 'SUCCESS',
      message: 'Product deleted successfully!'
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: 'Something went wrong!'
    })
  }
})

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
    .catch((error) => console.log({ error }))
})
































/*
    REST: Representational State Transfer
    - Standardized representation of APIs
    - CRUD operations

    HTTP Methods:
    - GET: 'Read' data (R)
    - POST: 'Create' data (C)
    - PUT/PATCH: 'Update' data (U)
    - DELETE: 'Delete' data (D)

    ## Example for E-Commerce Website:
    - APIs for Customers 
        - R: GET /customers
        - C: POST /customers
        - U: PUT /customers/:id
        - D: DELETE /customers/:id
    - APIs for Sellers
        - R: GET /sellers
        - C: POST /sellers
        - U: PUT /sellers/:id
        - D: DELETE /sellers/:id
    - APIs for Products
        - R: GET /products
        - C: POST /products
        - U: PUT /products/:id
        - D: DELETE /products/:id
        
    Search implementation in GET request
      app.get('/products', async (req, res) => {
        try {
          let query = {}
          const { seller } = req.query
          if(seller) {
            query = { seller }
          }
          const products = await Product.find(query)
          res.json({
            status: 'SUCCESS',
            data: products
          })
        } catch (error) {
          res.json({
            status: 'FAIL',
            message: 'Something went wrong!'
          })
        }
      })
*/