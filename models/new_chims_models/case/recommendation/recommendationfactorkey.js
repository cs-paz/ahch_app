let mongoose = require('mongoose');

// Recommendation Factor Key Schema
let recommendationFactorKeySchema = mongoose.Schema({
    factorType: {
        type: String
    },
    description: {
        type: String
    }


});

let RecommendationFactorKey = module.exports = mongoose.model('RecommendationFactorKey', recommendationFactorKeySchema);