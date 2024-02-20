const mongoose = require('mongoose')

const docuSchema = new mongoose.Schema({
    topic: {
        type: String,
       },
    
    description: {
        type: String,
           },
})

module.exports = mongoose.model('homeCollection', docuSchema);