let mongoose = require('mongoose');

// Case Schema
let caseSchema = mongoose.Schema({
    spiritNumber: {
        type: Number,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    familyNameSecondary: {
        type: String
    },
    createdDate: {
        type: Date,
    },
    createdBy: {
        type: String
    },
    statusChangeDate: {
        type: Date
    },
    caseWorkerID: {
        type: Number
    },
    supervisorID: {
        type: Number
    },
    agencyID: {
        type: Number
    },
    statusID: {
        type: Number
    },
    referredMemberID: {
        type: Number
    },
    caseTypeID: {
        type: Number
    }

});

let Case = module.exports = mongoose.model('Case', caseSchema);