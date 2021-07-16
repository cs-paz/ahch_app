const { ObjectId } = require('mongodb');
const { get } = require('mongoose');
const { cases } = require('../config/mongoCollections');
const bcrypt = require('bcryptjs')

function clean(obj) {
    obj._id = obj._id.toString()
    return obj
}

async function add(formRequestBody) {
    if (!formRequestBody) throw 'No form body provided'
    let Patient = require('../models/new_chims_models/case/patient/patient');

    let newPatient = new User();

    newPatient.medicalRef = formRequestBody.medicalRef;
    newPatient.firstName = formRequestBody.firstName;
    newPatient.middleInitial = formRequestBody.middleInitial;
    newPatient.lastName = formRequestBody.lastName;
    newPatient.guardianID = formRequestBody.guardianID;
    newPatient.guardianRelationship = formRequestBody.guardianRelationship;
    newPatient.guardianStaffID = formRequestBody.guardianStaffID;
    newPatient.SSN = formRequestBody.SSN;
    newPatient.DOB = formRequestBody.DOB;
    newPatient.gender = formRequestBody.gender;
    newPatient.legalStatus = formRequestBody.legalStatus;
    newPatient.primaryLanguage = formRequestBody.primaryLanguage;
    newPatient.address = formRequestBody.address;
    newPatient.address2 = formRequestBody.address2;
    newPatient.city = formRequestBody.city;
    newPatient.countyID = formRequestBody.countyID; 
    // country is missing from form, so don't have it currently
    newPatient.stateID = formRequestBody.stateID;
    newPatient.zipCode = formRequestBody.zipCode;
    newPatient.phone = formRequestBody.phone;
    newPatient.phone2 = formRequestBody.phone2;
    newPatient.mobile = formRequestBody.mobile;
    newPatient.email = formRequestBody.email;
    newPatient.specialNeeds = formRequestBody.specialNeeds;

    console.log(newPatient);

    try {
        Patient.create(newPatient);
    } catch (e) {
        console.log(e);
    }

    // no clue what this does
    // User.find({}, (err, users) => {
    //     console.log(users);
    // });

    const caseCollection = await cases();

    let caseID = ObjectId(formRequestBody.caseID);

    // updateInfo = await caseCollection.update( { _id: caseID, $push : { patients : { newPatient } } } ); maybe better, have to test
    
    let currentCase = null

    try {
        currentCase = await caseCollection.findOne({ _id: caseID })
    } catch (e) {
        throw e;
    }

    currentCase.patients.push(newPatient)

    const updated = await currentCase.save() // should work without update, if not have to update with caseCollection

    return updated
}

async function update(id, formRequestBody) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    
    if (!formRequestBody) throw 'No form body provided'
    let Patient = require('../models/new_chims_models/case/patient/patient');

    let newPatient = new User();

    newPatient.medicalRef = formRequestBody.medicalRef;
    newPatient.firstName = formRequestBody.firstName;
    newPatient.middleInitial = formRequestBody.middleInitial;
    newPatient.lastName = formRequestBody.lastName;
    newPatient.guardianID = formRequestBody.guardianID;
    newPatient.guardianRelationship = formRequestBody.guardianRelationship;
    newPatient.guardianStaffID = formRequestBody.guardianStaffID;
    newPatient.SSN = formRequestBody.SSN;
    newPatient.DOB = formRequestBody.DOB;
    newPatient.gender = formRequestBody.gender;
    newPatient.legalStatus = formRequestBody.legalStatus;
    newPatient.primaryLanguage = formRequestBody.primaryLanguage;
    newPatient.address = formRequestBody.address;
    newPatient.address2 = formRequestBody.address2;
    newPatient.city = formRequestBody.city;
    newPatient.countyID = formRequestBody.countyID; 
    // country is missing from form, so don't have it currently
    newPatient.stateID = formRequestBody.stateID;
    newPatient.zipCode = formRequestBody.zipCode;
    newPatient.phone = formRequestBody.phone;
    newPatient.phone2 = formRequestBody.phone2;
    newPatient.mobile = formRequestBody.mobile;
    newPatient.email = formRequestBody.email;
    newPatient.specialNeeds = formRequestBody.specialNeeds;

    const currentCase = await caseCollection.findOneAndUpate(
        { "patients._id": ObjectId(id) }, 
        { $set: newPatient }); // think this should work

    return currentCase;
}

async function getAllPatients(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases();
    const currentCase = await caseCollection.findOne({ _id: ObjectId(id) })
    if (currentCase === null) throw `No case could be found with the id '${id}'`
    return currentCase.patients;
}
  
async function getPatient(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases()
    const patient = await caseCollection.findOne({ "patients._id": ObjectId(id) })
    if (patient === null) throw `No patient could be found with the id '${id}'`
    return patient;
}


module.exports = {
    add,
    update,
    getPatient,
    getAllPatients
}