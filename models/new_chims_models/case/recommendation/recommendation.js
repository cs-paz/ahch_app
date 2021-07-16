let mongoose = require('mongoose');
const recommendationFactorKey = require('./recommendationfacorkey').schema;


// Recommendation Schema
let recommendationSchema = mongoose.Schema({
    createdDate: {
        type: Date
    },
    typeName: {
        type: String
    },
    evaluationDate: {
        type: Date
    },
    referralReason: {
        type: String
    },
    findingComments: {
        type: String
    },
    riskFactors: {
        type: String
    },
    recommendationComments: {
        type: String
    },
    comments: {
        type: String
    },
    recommendationFactorKey: recommendationFactorKey


});

let Recommendation = module.exports = mongoose.model('Recommendation', recommendationSchema);