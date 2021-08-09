let mongoose = require('mongoose');

// Case Note Schema
let caseNoteSchema = mongoose.Schema({
    createdDate: {
        type: Date
    },
    editDate: {
        type: Date
    },
    username: {
        type: String
    },
    comments: {
        type: String
    }
});

let CaseNotes = module.exports = mongoose.model('CaseNotes', caseNoteSchema);