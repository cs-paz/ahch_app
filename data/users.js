const { ObjectId } = require('mongodb');
const { get } = require('mongoose');
const { users } = require('../config/mongoCollections');
const bcrypt = require('bcryptjs')

function clean(obj) {
    obj._id = obj._id.toString()
    return obj
}

async function add(formRequestBody) {
    if (!formRequestBody) throw 'No form body provided'
    let User = require('../models/new_chims_models/users/user');

    let newUser = new User();

    newUser.userId = formRequestBody.userId;
    newUser.username = formRequestBody.username;
    newUser.firstName = formRequestBody.firstName;
    newUser.middleInitial = formRequestBody.middleInitial;
    newUser.lastName = formRequestBody.LastName;
    newUser.password = await bcrypt.hash(formRequestBody.password, 10);
    newUser.authType = formRequestBody.authType;
    newUser.userGUID = formRequestBody.userGUID;
    newUser.organization.organization = formRequestBody.organization.organization;
    newUser.notes = formRequestBody.notes;
    newUser.role = formRequestBody.role;
    console.log(newUser);

    try {
        User.create(newUser);
    } catch (e) {
        console.log(e);
    }

    // no clue what this does
    // User.find({}, (err, users) => {
    //     console.log(users);
    // });

    const userCollection = await users();
    let insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount == 0) throw 'Error: could not add user.';
    return await getUser(insertInfo.insertedId.toString());
}

async function getAllUsers() {
    const userCollection = await users()
    const userArr = await userCollection.find({}).toArray()
    return userArr.map(clean)
}
  
async function getUser(id) {
    if (!id) throw 'Error: id not given.'
    if (typeof(id) != "string") throw 'Error: type of id not string.'
    if (id.trim().length == 0) throw 'Error: id is either an empty string or just whitespace.'
  
    const userCollection = await users()
  
    const user = await userCollection.findOne({ _id: ObjectId(id) })
    if (user === null) throw `No user could be found with the id '${id}'`
    return clean(user)
}

module.exports = {
    add,
    getUser,
    getAllUsers
}