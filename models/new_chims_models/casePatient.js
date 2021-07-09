let mongoose = require('mongoose');

// Case Patient Schema
let casePatientSchema = mongoose.Schema({
    medicalRef: {
        type: String
    }
});

let CasePatient = module.exports = mongoose.model('CasePatient', casePatientSchema);