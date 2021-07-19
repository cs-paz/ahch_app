let mongoose = require('mongoose');

// Service Schedule Schema
let serviceScheduleSchema = mongoose.Schema({
    referralType: {
        type: String
    },
    scheduler: {
        type: String
    },
    notes: {
        type: String
    },
    clinician: { // for now
        type: String
    },
    providerID: {
        type: Number
    },
    reportSubmitted: {
        type: String
    },
    reportSubmittedDate: {
        type: Date
    },
    createdDate: {
        type: Date
    },
    status: {
        type: String
    }

});

let ServiceSchedule = module.exports = mongoose.model('ServiceSchedule', serviceScheduleSchema);