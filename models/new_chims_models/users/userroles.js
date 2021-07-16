let mongoose = require('mongoose');

// User Roles Schema
let userRolesSchema = mongoose.Schema({
    role: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    order: {
        type: Number
    }


});

let UserRoles = module.exports = mongoose.model('UserRoles', userRolesSchema);