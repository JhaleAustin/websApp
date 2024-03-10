const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
   
    height: {
        type: Number,
        required: true
    },

    numOfLeaves: {
        type: Number,
        required: true
    },
    analysisDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('analysisCollection', analysisSchema);