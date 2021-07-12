let mongoose = require('mongoose');

// Service Type Schema
let serviceTypeSchema = mongoose.Schema({
    service: {
        type: String
    },
    category: {
        type: String
    },
    order: {
        type: Number
    }


});

let ServiceType = module.exports = mongoose.model('ServiceType', serviceTypeSchema);