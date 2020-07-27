const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

const mongooseConnectionStr = process.env.MONGODB_URI || process.env.MONGODB_LOCAL
mongoose.connect(mongooseConnectionStr, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use( '/', api )

const PORT = process.env.PORT || process.env.DEV_PORT
app.listen(PORT, function () {
console.log(`Running server on port ${PORT}`)})