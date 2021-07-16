const userData = require('./users');
const caseData = require('./cases');
const intakeData = require('./parseIntake');
const patientData = require('./patients');
const familyData = require('./family')

module.exports = {
    users: userData,
    cases: caseData,
    intake: intakeData,
    patients: patientData,
    family: familyData
}