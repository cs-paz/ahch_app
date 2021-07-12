let mongoose = require('mongoose');

// Service Schedule Schema
let serviceScheduleSchema = mongoose.Schema({
    ReferralType: {
        type: String
    },
    Scheduler: {
        type: String
    },
    Notes: {
        type: String
    },
    ProviderID: {
        type: Number
    },
    ReportSubmitted: {
        type: String
    },
    ReportSubmittedDate: {
        type: Date
    },
    CreatedDate: {
        type: Date
    },
    Status: {
        type: String
    }

});

let ServiceSchedule = module.exports = mongoose.model('ServiceSchedule', serviceScheduleSchema);