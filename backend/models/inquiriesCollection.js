const mongoose = require('mongoose')

const inquriesSchema = new mongoose.Schema({
    inquiry: {
        type: String,
        required: true
       },
    inputDate: {
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

})

module.exports = mongoose.model('inquiriesCollection', inquriesSchema);