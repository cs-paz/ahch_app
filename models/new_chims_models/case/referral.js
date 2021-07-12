let mongoose = require('mongoose');

// Referral Schema
let referralSchema = mongoose.Schema({
    reason: {
        type: String
    },
    questions: {
        type: String
    },
    disclosure: {
        type: String
    },
    disclosureDesc: {
        type: String
    },
    circumstances: {
        type: String
    },
    interview: {
        type: String
    },
    interviewDesc: {
        type: String
    },
    statements: {
        type: String
    },
    statementDate: {
        type: Date
    }


});

let Referral = module.exports = mongoose.model('Referral', referralSchema);