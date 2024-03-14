const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    followup: {
        type: mongoose.Schema.ObjectId,
        ref: 'followupCollection',
        required: true
       },
    admin:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    reply: {
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
    replyDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('replyCollection', replySchema);