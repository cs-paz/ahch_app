let mongoose = require('mongoose');
const organization = require('./userorganization')
const role = require('./userroles')

// Users Schema
let userSchema = mongoose.Schema({
    Username: {
        type: String
    },
    FirstName: {
        type: String
    },
    MI: {
        type: String
    },
    LastName: {
        type: String
    },
    Password: {
        type: String
    },
    AuthType: {
        type: String
    },
    UserGUID: {
        type: String
    },
    Notes: {
        type: String
    },
    Role: {
        type: String
    },
    organization: organization,
    roles: [role]
});

let User = module.exports = mongoose.model('User', userSchema);