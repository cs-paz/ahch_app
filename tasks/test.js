// This file is to seed the database with predetermined values when being installed on a new machine

const express = require('express')
const router = express.Router()
const dbConnection = require('../config/mongoConnection');
const data = require('../data');

async function main() {
  const db = await dbConnection();
//   await db.dropDatabase();
//   const john = await data.users.add({UserID: 12345, Username: "johnIsCool", FirstName: "John", MI: "M", LastName: "Smith", Password: "reallyCoolGuy1", AuthType: "None", UserGUID: "123", OrganizationID: 1, Notes: "Test User", Role: "Normal"})
//   console.log(john)
  const testCase = await data.cases.add({caseworkerNameCPP: "elijah wendel", caseworkerNumberCPP: 54331, caseworkerEmailCPP: "ezwendel@gmail.com", caseName: "wendel"})
  const testPatient1 = await data.patients.add({caseID: testCase._id, firstName: "elijah", lastName: "wendel", middleInitial: "Z", gender: "Male"})
  const testPatient2 = await data.patients.add({caseID: testCase._id, firstName: "miles", lastName: "zakos", middleInitial: "M", gender: "Male"})
  const testPatient3 = await data.patients.add({caseID: testCase._id, firstName: "cael", lastName: "burkhardt", gender: "NB"})
  console.log(await data.patients.getAllPatients(testCase._id.toString()))
  console.log(await data.patients.getPatient(testPatient2._id.toString()))
  await db.serverConfig.close();
}

main()