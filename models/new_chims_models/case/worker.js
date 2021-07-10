let mongoose = require('mongoose');

// Worker Schema
let workerSchema = mongoose.Schema({
    Service: {
        type: String
    },
    WorkerTypeID: {
        type: Number
    },
    FirstName: {
        type: String
    },
    MI: {
        type: String
    },
    LastName: {
        type: String
    },
    Agency: {
        type: String
    },
    Address: {
        type: String
    },
    Address2: {
        type: String
    },
    City: {
        type: String
    },
    StateID: {
        type: Number
    },
    CountyID: {
        type: Number
    },
    ZipCode: {
        type: String
    },
    CountryID: {
        type: Number
    },
    Phone: {
        type: String
    },
    Ext: {
        type: String
    },
    CreatedDate: {
        type: Date
    },
    ModifiedDate: {
        type: Date
    },
    OrganizationID: {
        type: Number
    },
    TypeName: {
        type: String
    },
    Description: {
        type: String
    },
    referer: {
        type: String
    }

});

let Worker = module.exports = mongoose.model('Worker', workerSchema);