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
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('analysisCollection', analysisSchema);