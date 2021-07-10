let mongoose = require('mongoose');

// User Organization Schema
let userOrganizationSchema = mongoose.Schema({
    Organization: {
        type: String
    },
    Description: {
        type: String
    }


});

let UserOrganization = module.exports = mongoose.model('UserOrganization', userOrganizationSchema);