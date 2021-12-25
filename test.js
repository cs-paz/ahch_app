form = {}
form.username = "me"
form.lastName = "dsa"

let User = require('./models/new_chims_models/users/user');

newUser = new User();

newUser.username = form.username;
newUser.firstName = form.firstName;
newUser.lastName = form.lastName;

console.log(newUser)