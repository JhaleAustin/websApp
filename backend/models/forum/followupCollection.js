const mongoose = require('mongoose')

const followupSchema = new mongoose.Schema({
    answer:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'answersCollection',
        required: true
    },
    followup: {
        type: String,
        required: true
       },
    images: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        }
    ],
    followupDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('followupCollection', followupSchema);