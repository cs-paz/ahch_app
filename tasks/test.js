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
  let testCase = await data.cases.add({caseworkerNameCPP: "elijah wendel", caseworkerNumberCPP: 54331, caseworkerEmailCPP: "ezwendel@gmail.com", caseName: "wendel"})
  let testPatient1 = await data.patients.add({caseID: testCase._id, firstName: "elijah", lastName: "wendel", middleInitial: "Z", gender: "Male"})
  let testPatient2 = await data.patients.add({caseID: testCase._id, firstName: "miles", lastName: "zakos", middleInitial: "M", gender: "Male"})
  let testPatient3 = await data.patients.add({caseID: testCase._id, firstName: "cael", lastName: "burkhardt", gender: "NB"})
  console.log(await data.patients.getAllPatients(testCase._id.toString()))
  console.log(await data.patients.getPatient(testPatient2._id.toString()))
  testPatient2 = await data.patients.update(testPatient2._id.toString(), {firstName: "luke", lastName: "maake"})
  console.log(await data.patients.getAllPatients(testCase._id.toString()))
  let testFamily1 = await data.family.add({caseID: testCase._id, firstName: "shannon", lastName: "madara", gender: "Female", relationship: "Mother"})
  let testFamily2 = await data.family.add({caseID: testCase._id, firstName: "guy", lastName: "maake", gender: "Male"})
  
  await db.serverConfig.close();
}

main()