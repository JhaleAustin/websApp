const mongoose = require('mongoose')

const docuSchema = new mongoose.Schema({
    plantType: {
        type: String,
       },
    
    height: {
        type: Number,
           },
    leaves: [
        {
            length: {
                type: Number
              
            },
            width: {
                type: Number
                
            },
        }],
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
    setDate: {
        type: Date, 
    }    
    
     
})

module.exports = mongoose.model('docuCollection', docuSchema);