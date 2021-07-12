let mongoose = require('mongoose');

// Recommendation Factor Key Schema
let recommendationFactorKeySchema = mongoose.Schema({
    FactorType: {
        type: String
    },
    Description: {
        type: String
    }


});

let RecommendationFactorKey = module.exports = mongoose.model('RecommendationFactorKey', recommendationFactorKeySchema);