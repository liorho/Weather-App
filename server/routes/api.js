const express = require('express')
const router = express.Router()
const request = require('request')
const moment = require('moment')
const City = require('../models/City')
const apiKey = "94e5203703124330855120607191707"



// Get City data
router.get('/city/:cityName', function (req, res) {

    let cityName = req.params.cityName

    request.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${cityName}`,
        function (err, weather) {
            weather = JSON.parse(weather.body)
            console.log(weather)
            res.send(weather)
        })

})

// Send Cities DB
router.get('/cities', function (req, res) {

    City.find({}, function (err, cities) {
        // cities.forEach(city => {
        //     let now = moment()
        //     let totalDiff = now.diff(city.lastUpdated, 'minutes')
            
        //     if (totalDiff>30){
        //         request.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city.name}`,
        //               function (err, weather) {
        //               weather = JSON.parse(weather.body)
        //     console.log(weather)
        //     res.send(weather)
        // })
        //     }




        // })


        res.send(cities)

    })

})

// Saving New City to DB
router.post('/city', function (req, res) {

    let data = req.body
    console.log(data)
    new City({...data}).save()
    res.send()
})

// Delete city from DB
router.delete('/city/:cityName', function (req, res) {

    let cityName = req.params.cityName
    City.findOneAndRemove({ name: cityName }).then(city => res.send(city + "was deleted"))

})


module.exports = router