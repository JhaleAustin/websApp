const mongoose = require('mongoose')

const docuSchema = new mongoose.Schema({
    plantTypes: {
        type: mongoose.Schema.ObjectId,
        ref: 'planttypesCollection',
        required: true
    }, 

    collectionDate: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    leaves: 
        {
            length: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
        },

    numOfLeaves: {
        type: Number,
        required: true
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
})

module.exports = mongoose.model('docuCollection', docuSchema);