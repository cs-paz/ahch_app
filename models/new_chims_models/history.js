let mongoose = require('mongoose');

// History Schema
let historySchema = mongoose.Schema({
    HistoryID: {
        type: Number
    },
    CaseID: {
        type: Number
    },
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
    }

});

let History = module.exports = mongoose.model('History', historySchema);