require('dotenv').config()
const express = require('express')
const morgan = require('morgan') 
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const app = express()

//config lib middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(compression())

//init database
require('./db/db.mongo')

//init route
app.get('/', (req, res) => {
  res.status(200).json('hello world')
})


//handle error
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({message: error.message || 'Interval Server Error'})
})

module.exports = app