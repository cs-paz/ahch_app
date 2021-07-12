let mongoose = require('mongoose');
const abuse = require('./abuse').schema;
const evaluation = require('./evaluation').schema;
const interview = require('./interview/interview').schema;
const history = require('./history').schema;

// Patient Schema
let patientSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    middleInitial: {
        type: String
    },
    lastName: {
        type: String
    },
    guardianID: {
        type: Number
    },
    guardianStaffID: {
        type: Number
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
    PrimaryLanguage: {
        type: Number
    },
    languageID: {
        type: Number
    },
    legalStatus: {
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
    countryID: {
        type: Number
    },
    zipcode: {
        type: String
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
    },
    DYFSHistory: {
        type: String
    },
    patientCode: {
        type: String
    },
    createdDate: {
        type: Date
    },
    lastModified: {
        type: Date
    },
    inSchool: {
        type: String
    },
    educationLevel: {
        type: String
    },
    school: {
        type: String
    },
    schoolContact: {
        type: String
    },
    schoolPhone: {
        type: String
    },
    countFamilyMembers: {
        type: Number
    },
    countFamilyInHousehold: {
        type: Number
    },
    countChildren: {
        type: Number
    },
    firstAbuse: {
        type: String
    },
    countIncident: {
        type: Number
    },
    abuseStart: {
        type: Date
    },
    lastContact: {
        type: Date
    },
    referral97: {
        type: String
    },
    referralDate97: {
        type: Date
    },
    medicalRef: {
        type: String
    },
    livesWith: {
        type: String
    },
    generalBehavior: {
        type: String
    },
    TannerStage: {
        type: String
    },
    abuse: abuse,
    interview: interview,
    history: history,
    evaluations: [evaluation]
});

let Patient = module.exports = mongoose.model('Patient', patientSchema);