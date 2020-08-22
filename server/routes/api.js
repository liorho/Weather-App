const express = require('express')
const router = express.Router()
const request = require('request')
const moment = require('moment')
const City = require('../models/City')

require('dotenv').config()

const { API_KEY, API_URI } = process.env

// Get City data
router.get('/city/:cityName', function (req, res) {
    let { cityName } = req.params
    request.get(`${API_URI}?q=${cityName}&appid=${API_KEY}`,
        function (err, weather) {
            res.send(weather)
        })
})

// Send Cities DB
router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

// Saving New City to DB
router.post('/city', function (req, res) {
    let data = req.body
    new City({ ...data }).save()
    res.send()
})

// Update City Weather
router.put('/city', function (req, res) {
    let data = req.body
    City.findOne({ name: data.name }, function (err, city) {
        city.temperature = data.temperature
        city.condition = data.condition
        city.conditionIcon = data.conditionIcon
        city.lastUpdated = data.lastUpdated
        city.diff = data.diff
        city.lastRefreshed = data.lastRefreshed
        city.save()
        res.send(city)
    })
})

// Delete city from DB
router.delete('/city/:cityName', function (req, res) {
    let { cityName } = req.params
    City.findOneAndRemove({ name: cityName }).then(city => res.send(city.name + " was deleted"))
})

module.exports = router