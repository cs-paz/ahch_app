let mongoose = require('mongoose');
const activity  = require('./activities').schema;
// Interview Schema
let interviewSchema = mongoose.Schema({
    InterviewDate: {
        type: Date
    },
    Notes: {
        type: String
    },
    GenitalDetails: {
        type: String
    },
    AnalDetails: {
        type: String
    },
    FondlingDetails: {
        type: String
    },
    ExposureDetails: {
        type: String
    },
    OralDetails: {
        type: String
    },
    activities: [activity]

});

let Interview = module.exports = mongoose.model('Interview', interviewSchema);