const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const apiKey = "94e5203703124330855120607191707"



// Get City data
router.get('/city/:cityName', function (req, res) {

    let cityName = req.params.cityName

    request.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${cityName}`,
        function (err, weather) {
            weather = JSON.parse(weather.body)
            res.send(weather)
        })

})

// Get Cities DB
router.get('/cities', function (req, res) {

    City.find({}, function (err, cities) {
        res.send(cities)

    })

})

// Saving New City to DB
router.post('/city', function (req, res) {

    let data = req.body
    new City({ ...data }).save() ////////////////////
    res.send()
})

// Delete city from DB
router.delete('/city/:cityName', function (req, res) {

    let cityName = req.params.cityName
    City.findOneAndRemove({name: cityName}).then(city => res.send (city + "was deleted"))
 
})


module.exports = router