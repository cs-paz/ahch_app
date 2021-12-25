// This file is to seed the database with predetermined values when being installed on a new machine

const express = require('express')
const router = express.Router()
const dbConnection = require('../config/mongoConnection');
const data = require('../data');

async function main() {
  cases = await data.cases.searchByName("maake")
  console.log(cases)
}

main()