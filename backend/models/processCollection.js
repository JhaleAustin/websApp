const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
       },
    content: {
        type: String,
        required: true
       },
})

module.exports = mongoose.model('processCollection', processSchema);