const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    plantType: {
        type: String,
       },
    height: {
        type: String,
           },
    leaves: {
        type: Array,
        },
    
     
    
})

module.exports = mongoose.model('recordCollection', recordSchema);