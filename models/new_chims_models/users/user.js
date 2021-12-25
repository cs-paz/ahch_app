let mongoose = require('mongoose');
const organization = require('./userorganization').schema
const role = require('./userroles').schema

// Users Schema
let userSchema = mongoose.Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    middleInitial: {
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
    organization: [organization],
    roles: [role]
});

let User = module.exports = mongoose.model('User', userSchema);