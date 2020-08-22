const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const PORT = process.env.PORT
app.listen(PORT, function () {
console.log(`Running server on port ${PORT}`)})