let mongoose = require('mongoose');

// Suspect Schema
let suspectSchema = mongoose.Schema({
    FirstName: {
        type: String
    },
    MI: {
        type: String
    },
    LastName: {
        type: String
    },
    DOB: {
        type: Date
    },
    AbuseHistory: {
        type: String
    },
    Gender: {
        type: String
    },
    RelationshipID: {
        type: Number
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
    ZipCode: {
        type: String
    },
    CountryID: {
        type: Number
    },
    CountyID: {
        type: Number
    },
    Phone: {
        type: String
    },
    Phone2: {
        type: String
    },
    Mobile: {
        type: String
    },
    Email: {
        type: String
    }


});

let Suspect = module.exports = mongoose.model('Suspect', suspectSchema);