let mongoose = require('mongoose');
const caseNote = require('./caseNote.js');
const caseStatus = require('./caseStatus');
const caseType = require('./caseType');
const familyMember = require('./familyMember');
const patient = require('./patient/patient');
const worker = require('./worker');
const referral = require('./referral');
const suspect = require('./suspect');

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
    referrals: [referral],
    worker: worker,
    family: [familyMember],
    patients: [patient],
    caseNotes: [caseNote],
    suspects: [suspect]
});

let Case = module.exports = mongoose.model('Case', caseSchema);