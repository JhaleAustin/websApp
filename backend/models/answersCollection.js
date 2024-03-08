const mongoose = require('mongoose')

const answersSchema = new mongoose.Schema({
    inquiry: {
        type: mongoose.Schema.ObjectId,
        ref: 'inquiriesCollection',
        required: true
       },
    admin:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    answer: {
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
    answerDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('answersCollection', answersSchema);