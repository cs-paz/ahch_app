let mongoose = require('mongoose');

// History Schema
let historySchema = mongoose.Schema({
    PertinentHistory: {
        type: String
    },
    PertinentHistoryDesc: {
        type: String
    },
    SexualizedBehavior: {
        type: String
    },
    SexualizedBehaviorDesc: {
        type: String
    },
    Evaluation: {
        type: String
    },
    LastContactDate: {
        type: Date
    },
    EventDate: {
        type: Date
    }

});

let History = module.exports = mongoose.model('History', historySchema);