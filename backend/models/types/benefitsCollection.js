const mongoose = require('mongoose')

const bSchema = new mongoose.Schema({
    types: {
        type: mongoose.Schema.ObjectId,
        ref: 'homeCollection',
        required: true
    },
    topic: {
        type: String,
        required: true
       },
    description: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('benefitsCollection', bSchema);