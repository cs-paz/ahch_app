let mongoose = require('mongoose');

// Escort Schema
let escortSchema = mongoose.Schema({
    workerID: {
        type: Number
    },
    familyID: {
        type: String
    },
    caseID: {
        type: Number,
        required: true
    }

});

let Escort = module.exports = mongoose.model('Escort', escortSchema);