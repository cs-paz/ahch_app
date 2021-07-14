const userData = require('./users');
const caseData = require('./cases');
const intakeData = require('./parseIntake');
const patientData = require('./patients');

module.exports = {
    users: userData,
    cases: caseData,
    intake: intakeData,
    patients: patientData
}