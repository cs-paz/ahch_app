let mongoose = require('mongoose');
const activity  = require('./activities').schema;
// Interview Schema
let interviewSchema = mongoose.Schema({
    interviewDate: {
        type: Date
    },
    notes: {
        type: String
    },
    genitalDetails: {
        type: String
    },
    analDetails: {
        type: String
    },
    fondlingDetails: {
        type: String
    },
    exposureDetails: {
        type: String
    },
    oralDetails: {
        type: String
    },
    activities: [activity]

});

let Interview = module.exports = mongoose.model('Interview', interviewSchema);