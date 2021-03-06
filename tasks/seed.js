// This file is to seed the database with predetermined values when being installed on a new machine

const express = require('express')
const router = express.Router()
const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const userData = data.users

async function main() {
  const db = await dbConnection();
  // await db.dropDatabase();
  const john = await userData.add({UserID: 12345, Username: "johnIsCool", FirstName: "John", MI: "M", LastName: "Smith", Password: "reallyCoolGuy1", AuthType: "None", UserGUID: "123", OrganizationID: 1, Notes: "Test User", Role: "Normal"})
  console.log(john)
  await db.serverConfig.close();
}

main()