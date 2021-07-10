let mongoose = require('mongoose');

// Evaluation Schema
let evaluationSchema = mongoose.Schema({
    EvalType: {
        type: String
    },
    EvalDate: {
        type: Date
    },
    FirstName: {
        type: String
    },
    MI: {
        type: String
    },
    LastName: {
        type: String
    }

});

let Evaluation = module.exports = mongoose.model('Evaluation', evaluationSchema);