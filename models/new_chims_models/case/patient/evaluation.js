let mongoose = require('mongoose');

// Evaluation Schema
let evaluationSchema = mongoose.Schema({
    evalType: {
        type: String
    },
    evalDate: {
        type: Date
    },
    firstName: {
        type: String
    },
    MI: {
        type: String
    },
    lastName: {
        type: String
    }

});

let Evaluation = module.exports = mongoose.model('Evaluation', evaluationSchema);