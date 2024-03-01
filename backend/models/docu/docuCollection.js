const mongoose = require('mongoose')

const docuSchema = new mongoose.Schema({
    plantTypes: {
        type: mongoose.Schema.ObjectId,
        ref: 'planttypesCollection',
        required: true
    }, 

    collectionDate: {
        type: Date,
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
<<<<<<< HEAD:backend/models/docu/docuCollection.js
=======
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
    setDate: {
        type: Date, 
    }    
    
     
>>>>>>> cdfb4ef0dbd159cb21b60432d7550fc74af42081:backend/models/docuCollection.js
})

module.exports = mongoose.model('docuCollection', docuSchema);