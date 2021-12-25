let mongoose = require('mongoose');

// FamilyMember Schema
let familyMemberSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    middleInitial: {
        type: String
    },
    lastName: {
        type: String
    },
    relationship: {
        type: String
    },
    SSN: {
        type: String
    },
    DOB: {
        type: Date
    },
    gender: {
        type: String
    },
    legalStatus: {
        type: String
    },
    primaryLanguage: {
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
    countyID: {
        type: Number
    },
    countryID: {
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
    },
    specialNeeds: {
        type: String
    }

});

let FamilyMember = module.exports = mongoose.model('FamilyMember', familyMemberSchema);