const mongoose = require('mongoose')

const docuSchema = new mongoose.Schema({
    title: {
        type: String,
       },
    content: {
        type: String,
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
    ], 
    videos: [
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
    ],         
})

module.exports = mongoose.model('docuCollection', docuSchema);