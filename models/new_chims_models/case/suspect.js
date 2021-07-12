let mongoose = require('mongoose');

// Suspect Schema
let suspectSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    MI: {
        type: String
    },
    lastName: {
        type: String
    },
    DOB: {
        type: Date
    },
    abuseHistory: {
        type: String
    },
    gender: {
        type: String
    },
    relationshipID: {
        type: Number
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
    zipCode: {
        type: String
    },
    countryID: {
        type: Number
    },
    countyID: {
        type: Number
    },
    phone: {
        type: String
    },
    phone2: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    }


});

let Suspect = module.exports = mongoose.model('Suspect', suspectSchema);