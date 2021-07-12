let mongoose = require('mongoose');
const recommendationFactorKey = require('./recommendationfacorkey').schema;


// Recommendation Schema
let recommendationSchema = mongoose.Schema({
    CreatedDate: {
        type: Date
    },
    TypeName: {
        type: String
    },
    EvaluationDate: {
        type: Date
    },
    ReferralReason: {
        type: String
    },
    FindingComments: {
        type: String
    },
    RiskFactors: {
        type: String
    },
    RecommendationComments: {
        type: String
    },
    Comments: {
        type: String
    },
    recommendationFactorKey: recommendationFactorKey


});

let Recommendation = module.exports = mongoose.model('Recommendation', recommendationSchema);