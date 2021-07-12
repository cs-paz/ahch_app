let mongoose = require('mongoose');

// Activites Schema
let activitiesSchema = mongoose.Schema({
    activity: {
        type: String
    },
    category: {
        type: String
    },
    order: {
        type: Number
    }

});

let Activities = module.exports = mongoose.model('Activities', activitiesSchema);