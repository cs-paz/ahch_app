let mongoose = require('mongoose');

// Abuse Schema
let abuseSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    columnName: {
        type: String
    },
    typeName: {
        type: String
    }
});

let Abuse = module.exports = mongoose.model('Abuse', abuseSchema);