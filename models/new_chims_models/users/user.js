let mongoose = require('mongoose');
const organization = require('./userorganization')
const role = require('./userroles')

// Users Schema
let userSchema = mongoose.Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    MI: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    authType: {
        type: String
    },
    userGUID: {
        type: String
    },
    notes: {
        type: String
    },
    role: {
        type: String
    },
    organization: organization,
    roles: [role]
});

let User = module.exports = mongoose.model('User', userSchema);