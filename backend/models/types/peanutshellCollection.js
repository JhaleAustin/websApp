const mongoose = require('mongoose')

const psSchema = new mongoose.Schema({
    types: {
        type: mongoose.Schema.ObjectId,
        ref: 'homeCollection',
        required: true
    },
    topic: {
        type: String,
       },
    description: {
        type:String,
    }
})

module.exports = mongoose.model('peanutshellCollection', psSchema);