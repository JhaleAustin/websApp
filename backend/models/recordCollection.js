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
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ]
    
})

module.exports = mongoose.model('recordCollection', recordSchema);