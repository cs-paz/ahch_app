const { ObjectId } = require('mongodb');
const { get } = require('mongoose');
const { cases } = require('../config/mongoCollections');
const bcrypt = require('bcryptjs')

function clean(obj) {
    obj._id = obj._id.toString()
    return obj
}

function removeDuplicateObjects(arr) {
    let ids = []
    let returnArr = []
    for (i of arr) {
        if (!ids.includes(i._id.toString())) {
            ids.push(i._id.toString())
            returnArr.push(i)
        }
    }
    return returnArr
}

async function add(formRequestBody) {
    if (!formRequestBody) throw 'No form body provided'
    let Case = require('../models/new_chims_models/case/newCase');

    let newCase = new Case();

    newCase.caseworkerNameCPP = formRequestBody.caseworkerNameCPP;
    newCase.caseworkerNumberCPP = formRequestBody.caseworkerNumberCPP;
    newCase.caseworkerEmailCPP = formRequestBody.caseworkerEmailCPP;
    newCase.supervisorNameCPP = formRequestBody.supervisorNameCPP;
    newCase.supervisorNumberCPP = formRequestBody.supervisorNumberCPP;
    newCase.supervisorEmailCPP = formRequestBody.supervisorEmailCPP;
    newCase.rgName = formRequestBody.rgName;
    newCase.rgNumber = formRequestBody.rgNumber;
    newCase.rgEmail = formRequestBody.rgEmail;
    newCase.officeName = formRequestBody.officeName;
    newCase.officeAddress = formRequestBody.officeAddress;
    newCase.officeFaxNumber = formRequestBody.officeFaxNumber;
    newCase.dateSubmitted = formRequestBody.dateSubmitted;
    newCase.caseName = formRequestBody.caseName;
    newCase.spiritCaseID = formRequestBody.spiritCaseID;
    newCase.referredMemberName = formRequestBody.referredMemberName;
    newCase.spiritPersonID = formRequestBody.spiritPersonID;
    // console.log(newCase);

    try {
        Case.create(newCase);
    } catch (e) {
        console.log(e);
    }

    // no clue what this does
    // User.find({}, (err, users) => {
    //     console.log(users);
    // });

    const caseCollection = await cases();
    let insertInfo = await caseCollection.insertOne(newCase);
    if (insertInfo.insertedCount == 0) throw 'Error: could not add case.';
    return await getCase(insertInfo.insertedId.toString());
}

async function getAllCases() {
    const caseCollection = await cases()
    const caseArr = await caseCollection.find({}).toArray()
    return caseArr.map(clean)
}

async function getCase(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
  
    const caseCollection = await cases()
  
    const currentCase = await caseCollection.findOne({ _id: ObjectId(id) })
    if (currentCase === null) throw `No case could be found with the id '${id}'`
    return clean(currentCase)
}

async function searchByName(name) {
    if (!name) throw 'Error: name not given.'
    if (typeof(name) != "string") throw 'Error: type of name not string.'
    if (name.trim().length == 0) throw 'Error: name is either an empty string or just whitespace.'
  
    const caseCollection = await cases()

    const currentCases = await caseCollection.find({ caseName: name } ).toArray();
    if (currentCases === null) throw `No case could be found with the name '${name}'`
    return currentCases
}

async function extensiveSearchByName(name) {
    if (!name) throw 'Error: name not given.'
    if (typeof(name) != "string") throw 'Error: type of name not string.'
    if (name.trim().length == 0) throw 'Error: name is either an empty string or just whitespace.'
  
    const caseCollection = await cases()
    
    let names = name.split(" ")

    let totalArr = []

    for (i of names) {
        const caseNameCases = await caseCollection.find({ caseName: i } ).toArray();
        // const patientFirstNameCases = await caseCollection.find({ "patients.firstName": i } ).toArray();
        // const patientLastNameCases = await caseCollection.find({ "patients.lastName": i } ).toArray();
        totalArr = totalArr.concat(caseNameCases);
    }
    
    currentCases = removeDuplicateObjects(totalArr);
    
    if (currentCases === null) throw `No case could be found with the name '${name}'`
    return currentCases
}

async function searchByKC(kc) {
    if (!kc) throw 'Error: kc num not given.'
    if (typeof(kc) != "string") throw 'Error: type of kc num not string.'
    if (kc.trim().length == 0) throw 'Error: kc num is either an empty string or just whitespace.'
  
    const caseCollection = await cases()
  
    const currentCase = await caseCollection.findOne({ kcNum: kc });
    if (currentCase === null) throw `No case could be found with the kc number '${kc}'`
    return currentCase
}

module.exports = {
    add,
    getCase,
    getAllCases,
    searchByName,
    extensiveSearchByName,
    searchByKC
}