const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    lastUpdated: Date,
    temperature: Number,
    condition: String,
    conditionIcon: String,
    diff: Number,
    lastRefreshed: Date
})

const City = mongoose.model("city", citySchema)
module.exports = City