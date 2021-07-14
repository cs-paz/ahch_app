const { ObjectId } = require('mongodb');

function spiritNumberExists(spiritNum) {
    if (!spiritNum) throw 'You must provide a spirit number to search for';
    if (typeof spiritNum !== 'number') throw 'Spirit number must be of type number';
}

async function addCase(formRequestBody) {
    if (!formRequestBody) throw 'No form body provided'
    let Case = require('../models/new_chims_models/case/case.js');

    let newCase = new Case();

    newCase.spiritNumber = formRequestBody.spiritNumber;
    newCase.familyName = formRequestBody.familyName;
    newCase.createdDate = formRequestBody.dateToday;

    console.log(newCase);

    try {
        Case.create(newCase);
    } catch (e) {
        console.log(e);
    }

    Case.find({}, (err, cases) => {
        console.log(cases);
    });
}


module.exports = {
    addCase
}