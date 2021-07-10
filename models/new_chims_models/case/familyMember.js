let mongoose = require('mongoose');

// FamilyMember Schema
let familyMemberSchema = mongoose.Schema({
    FirstName: {
        type: String
    },
    MI: {
        type: String
    },
    LastName: {
        type: String
    },
    Relationship: {
        type: String
    },
    SSN: {
        type: String
    },
    DOB: {
        type: Date
    },
    Gender: {
        type: String
    },
    LegalStatus: {
        type: String
    },
    PrimaryLanguage: {
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
    CountyID: {
        type: Number
    },
    CountryID: {
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
    },
    SpecialNeeds: {
        type: String
    }

});

let FamilyMember = module.exports = mongoose.model('FamilyMember', familyMemberSchema);