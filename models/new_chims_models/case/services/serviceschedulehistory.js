let mongoose = require('mongoose');

// Service Schedule History Schema
let serviceScheduleHistorySchema = mongoose.Schema({
    SubmittedDate: {
        type: Date
    },
    ScheduleDate: {
        type: Date
    },
    StatusChangeDate: {
        type: Date
    }


});

let ServiceScheduleHistory = module.exports = mongoose.model('ServiceScheduleHistory', serviceScheduleHistorySchema);