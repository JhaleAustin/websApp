const mongoose = require('mongoose')

const ptSchema = new mongoose.Schema({
    types: {
        type: String,
        required: true
       },
})

module.exports = mongoose.model('planttypesCollection', ptSchema);