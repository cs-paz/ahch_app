let mongoose = require('mongoose');

// Interview Schema
let interviewSchema = mongoose.Schema({
    InterviewID: {
        type: Number
    },
    CaseID: {
        type: Number
    },
    PatientID: {
        type: Number
    },
    InterviewDate: {
        type: Date
    },
    Notes: {
        type: String
    },
    GenitalDetails: {
        type: String
    },
    AnalDetails: {
        type: String
    },
    FondlingDetails: {
        type: String
    },
    ExposureDetails: {
        type: String
    },
    OralDetails: {
        type: String
    }

});

let Interview = module.exports = mongoose.model('Interview', interviewSchema);