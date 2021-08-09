const { ObjectId } = require('mongodb');
const { id } = require('mongoose');
const { cases } = require('../config/mongoCollections');
const bcrypt = require('bcryptjs')

function clean(obj) {
    obj._id = obj._id.toString()
    return obj
}

async function add(formRequestBody) {
    if (!formRequestBody) throw 'No form body provided'
    let Note = require('../models/new_chims_models/case/caseNote');

    let newNote = new Note();

    newNote.createdDate = new Date();
    newNote.username = formRequestBody.username;
    newNote.comments = newNote.comments;

    console.log(newNote);

    try {
        Patient.create(newNote);
    } catch (e) {
        console.log(e);
    }

    const caseCollection = await cases();

    let caseId = ObjectId(formRequestBody.caseId);

    let updateInfo = await caseCollection.updateOne( { _id: caseId }, {$push : { caseNotes : newNote } } ); // maybe better, have to test
    
    return newNote;
}

async function update(id, formRequestBody) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    
    if (!formRequestBody) throw 'No form body provided'

    let oldNote = await getNote(id)

    for (i in formRequestBody) {
        oldNote[i] = formRequestBody[i];
    }

    oldNote.editTime = new Date();
    // delete oldNote._id;

    const caseCollection = await cases();

    const currentCase = await caseCollection.findOneAndUpdate(
        { "notes._id": ObjectId(id) }, 
        { $set: {"notes.$": oldNote} }); // think this should work

    return currentCase;
}

async function getAllNotes(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases();
    const currentCase = await caseCollection.findOne({ _id: ObjectId(id) })
    if (currentCase === null) throw `No case could be found with the id '${id}'`
    return currentCase.notes;
}
  
async function getNote(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
    const caseCollection = await cases()
    const currentCase = await caseCollection.findOne({ "notes._id": ObjectId(id) })
    if (currentCase === null) throw `No note could be found with the id '${id}'`
    for (i of currentCase.notes) {
        if (i._id == id) {
            return i;
        }
    }
    throw "shouldn't get here"
}


module.exports = {
    add,
    update,
    getNote,
    getAllNotes
}
