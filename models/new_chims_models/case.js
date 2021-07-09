let mongoose = require('mongoose');
const casenote = require('./casenote.js');
const casePatient = require('./casePatient');
const caseStatus = require('./caseStatus');
const caseSuspect = require('./caseSuspect');
const familyMember = require('./familyMember')


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
    family: [familyMember],
    patients: [patient],
    casenotes: [casenote],
    caseSuspects: [caseSuspect],
    caseStatus: caseStatus
});

let Case = module.exports = mongoose.model('Case', caseSchema);