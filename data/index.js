const userData = require('./users');
const caseData = require('./cases');
const intakeData = require('./parseIntake');
const patientData = require('./patients');
const familyData = require('./family');
const serviceData = require('./services');

module.exports = {
    users: userData,
    cases: caseData,
    intake: intakeData,
    patients: patientData,
    family: familyData,
    services: serviceData
}