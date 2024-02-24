const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    types: {
        type: String,
       },
})

module.exports = mongoose.model('homeCollection', homeSchema);