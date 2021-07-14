let mongoose = require('mongoose');

// Case Type Schema
let caseTypeSchema = mongoose.Schema({
    caseType: {
        type: String
    },
    desription: {
        type: String
    },
    order: {
        type: Number
    }

});

let CaseType = module.exports = mongoose.model('CaseType', caseTypeSchema);