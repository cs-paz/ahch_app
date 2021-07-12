let mongoose = require('mongoose');

// History Schema
let historySchema = mongoose.Schema({
    pertinentHistory: {
        type: String
    },
    pertinentHistoryDesc: {
        type: String
    },
    sexualizedBehavior: {
        type: String
    },
    sexualizedBehaviorDesc: {
        type: String
    },
    evaluation: {
        type: String
    },
    lastContactDate: {
        type: Date
    },
    eventDate: {
        type: Date
    }

});

let History = module.exports = mongoose.model('History', historySchema);