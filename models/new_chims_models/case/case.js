let mongoose = require('mongoose');
const caseNote = require('./caseNote.js').schema;
const caseStatus = require('./caseStatus').schema;
const caseType = require('./caseType').schema;
const familyMember = require('./familyMember').schema;
const patient = require('./patient/patient').schema;
const worker = require('./worker').schema;
const referral = require('./referral').schema;
const suspect = require('./suspect').schema;
const service = require('./service/service').schema;
const recommendation = require ('./recommendation/recommendation').schema;

// Case Schema
let caseSchema = mongoose.Schema({
    createdDate: {
        type: Date,
    },
    createdBy: {
        type: String
    },
    statusChangeDate: {
        type: Date
    },
    caseGUID: {
        type: String,
        required: true
    },
    DYFSID: {
        type: String
    },
    prosecutorID: {
        type: String
    },
    medicaidID: {
        type: String
    },
    familyName: {
        type: String
    },
    caseManagerID: {
        type: Number
    },
    statusID: {
        type: Number
    },
    intakeSubmittedDate: {
        type: Date
    },
    caseTypeID: {
        type: Number
    },
    caseStatus: caseStatus,
    caseType: caseType,
    recommendations: [recommendation],
    recommendationFactorKeys: [recommendationFactorKey],
    services: [service],
    referrals: [referral],
    worker: worker,
    family: [familyMember],
    patients: [patient],
    caseNotes: [caseNote],
    suspects: [suspect]
});

let Case = module.exports = mongoose.model('Case', caseSchema);