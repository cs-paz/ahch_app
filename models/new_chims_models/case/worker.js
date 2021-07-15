let mongoose = require('mongoose');

// Worker Schema
let workerSchema = mongoose.Schema({
    service: {
        type: String
    },
    workerTypeID: {
        type: Number
    },
    firstName: {
        type: String
    },
    MI: {
        type: String
    },
    lastName: {
        type: String
    },
    agency: {
        type: String
    },
    address: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    stateID: {
        type: Number
    },
    countyID: {
        type: Number
    },
    zipCode: {
        type: String
    },
    countryID: {
        type: Number
    },
    phone: {
        type: String
    },
    ext: {
        type: String
    },
    createdDate: {
        type: Date
    },
    modifiedDate: {
        type: Date
    },
    organizationID: {
        type: Number
    },
    typeName: {
        type: String
    },
    description: {
        type: String
    },
    referer: {
        type: String
    }

});

let Worker = module.exports = mongoose.model('Worker', workerSchema);