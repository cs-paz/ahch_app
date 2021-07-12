let mongoose = require('mongoose');

// Service Schedule History Schema
let serviceScheduleHistorySchema = mongoose.Schema({
    submittedDate: {
        type: Date
    },
    scheduleDate: {
        type: Date
    },
    statusChangeDate: {
        type: Date
    }


});

let ServiceScheduleHistory = module.exports = mongoose.model('ServiceScheduleHistory', serviceScheduleHistorySchema);