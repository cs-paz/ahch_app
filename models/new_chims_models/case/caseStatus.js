let mongoose = require('mongoose');

// Case Status Schema
let caseStatusSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    order: {
        type: Number
    },
    category: {
        type: String
    }
});

let CaseStatus = module.exports = mongoose.model('CaseStatus', caseStatusSchema);