let mongoose = require('mongoose');
const serviceSchedule = require('./serviceschedule').schema;
const serviceScheduleHistory = require('./serviceschedulehistory').schema;
const serviceType = require('./servicetype').schema;
// Service Schema
let serviceSchema = mongoose.Schema({
    service: {
        type: String
    },
    providerType: {
        type: String
    },
    serviceTypeID: {
        type: Number
    },
    agency: {
        type: String
    },
    address: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    stateID: {
        type: Number
    },
    zipCode: {
        type: String
    },
    countryID: {
        type: Number
    },
    countyID: {
        type: Number
    },
    phone: {
        type: String
    },
    phone2: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    serviceSchedule: serviceSchedule,
    serviceScheduleHistory: serviceScheduleHistory,
    serviceType: serviceType
});

let Service = module.exports = mongoose.model('Service', serviceSchema);