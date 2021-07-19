const { ObjectId } = require('mongodb');
const { get } = require('mongoose');
const { cases } = require('../config/mongoCollections');
const bcrypt = require('bcryptjs')

function clean(obj) {
    obj._id = obj._id.toString()
    return obj
}

async function add(formRequestBody) {
    return;
}

async function update(formRequestBody) {
    return;
}


async function getAllServices(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases();
    const currentCase = await caseCollection.findOne({ _id: ObjectId(id) })
    if (currentCase === null) throw `No case could be found with the id '${id}'`
    return currentCase.services;
}
  
async function getService(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases()
    const service = await caseCollection.findOne({ "services._id": ObjectId(id) })
    if (service === null) throw `No service could be found with the id '${id}'`
    return service;
}


module.exports = {
    add,
    update,
    getService,
    getAllServices
}