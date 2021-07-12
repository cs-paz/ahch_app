let mongoose = require('mongoose');

// User Organization Schema
let userOrganizationSchema = mongoose.Schema({
    organization: {
        type: String
    },
    description: {
        type: String
    }


});

let UserOrganization = module.exports = mongoose.model('UserOrganization', userOrganizationSchema);