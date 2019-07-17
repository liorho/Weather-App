const express = require('express')
const router = express.Router()
const request = require('request')
const Person = require('../models/Person') //Models to import



// example
router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})



module.exports = router