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
    let FamilyMember = require('../models/new_chims_models/case/familyMember');

    let newFamilyMember = new User();

    newFamilyMember.firstName = formRequestBody.firstName;
    newFamilyMember.middleInitial = formRequestBody.middleInitial;
    newFamilyMember.lastName = formRequestBody.lastName;
    newFamilyMember.relationship = formRequestBody.relationship;
    newFamilyMember.SSN = formRequestBody.SSN;
    newFamilyMember.DOB = formRequestBody.DOB;
    newFamilyMember.gender = formRequestBody.gender;
    newFamilyMember.legalStatus = formRequestBody.legalStatus;
    newFamilyMember.primaryLanguage = formRequestBody.primaryLanguage;
    newFamilyMember.address = formRequestBody.address;
    newFamilyMember.address2 = formRequestBody.address2;
    newFamilyMember.city = formRequestBody.city;
    newFamilyMember.countyID = formRequestBody.countyID; 
    // country is missing from form, so don't have it currently
    newFamilyMember.stateID = formRequestBody.stateID;
    newFamilyMember.zipCode = formRequestBody.zipCode;
    newFamilyMember.phone = formRequestBody.phone;
    newFamilyMember.phone2 = formRequestBody.phone2;
    newFamilyMember.mobile = formRequestBody.mobile;
    newFamilyMember.email = formRequestBody.email;
    newFamilyMember.specialNeeds = formRequestBody.specialNeeds;

    console.log(newFamilyMember);

    try {
        FamilyMember.create(newFamilyMember);
    } catch (e) {
        console.log(e);
    }

    const caseCollection = await cases();

    let caseID = ObjectId(formRequestBody.caseID);

    // updateInfo = await caseCollection.update( { _id: caseID, $push : { family : { newFamilyMember } } } ); //maybe better, have to test
    
    let currentCase = null

    try {
        currentCase = await caseCollection.findOne({ _id: caseID })
    } catch (e) {
        throw e;
    }

    currentCase.family.push(newFamilyMember)

    const updated = await currentCase.save() // should work without update, if not have to update with caseCollection

    return updated
}

async function update(id, formRequestBody) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    
    if (!formRequestBody) throw 'No form body provided'
    let FamilyMember = require('../models/new_chims_models/case/familyMember');

    let newFamilyMember = new User();

    newFamilyMember.firstName = formRequestBody.firstName;
    newFamilyMember.middleInitial = formRequestBody.middleInitial;
    newFamilyMember.lastName = formRequestBody.lastName;
    newFamilyMember.relationship = formRequestBody.relationship;
    newFamilyMember.SSN = formRequestBody.SSN;
    newFamilyMember.DOB = formRequestBody.DOB;
    newFamilyMember.gender = formRequestBody.gender;
    newFamilyMember.legalStatus = formRequestBody.legalStatus;
    newFamilyMember.primaryLanguage = formRequestBody.primaryLanguage;
    newFamilyMember.address = formRequestBody.address;
    newFamilyMember.address2 = formRequestBody.address2;
    newFamilyMember.city = formRequestBody.city;
    newFamilyMember.countyID = formRequestBody.countyID; 
    // country is missing from form, so don't have it currently
    newFamilyMember.stateID = formRequestBody.stateID;
    newFamilyMember.zipCode = formRequestBody.zipCode;
    newFamilyMember.phone = formRequestBody.phone;
    newFamilyMember.phone2 = formRequestBody.phone2;
    newFamilyMember.mobile = formRequestBody.mobile;
    newFamilyMember.email = formRequestBody.email;
    newFamilyMember.specialNeeds = formRequestBody.specialNeeds;

    const currentCase = await caseCollection.findOneAndUpate(
        { "family._id": ObjectId(id) }, 
        { $set: newFamilyMember }); // think this should work

    return currentCase;
}

async function getFamily(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases();
    const currentCase = await caseCollection.findOne({ _id: ObjectId(id) })
    if (currentCase === null) throw `No case could be found with the id '${id}'`
    return currentCase.family;
}
  
async function getFamilyMember(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases()
    const familyMember = await caseCollection.findOne({ "family._id": ObjectId(id) })
    if (familyMember === null) throw `No patient could be found with the id '${id}'`
    return familyMember;
}


module.exports = {
    add,
    update,
    getFamily,
    getFamilyMember
}