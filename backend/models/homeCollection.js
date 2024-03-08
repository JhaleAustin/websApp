const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    types: {
        type: String,
        required: true
       },
})

module.exports = mongoose.model('homeCollection', homeSchema);