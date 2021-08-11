const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const moment = require('moment')
require('dotenv').config()

// Connect to Database
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the Default Connection
let db = mongoose.connection;

// Check for Connection
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Initialize App
const app = express();

// Initialize session
app.use(session({
	name: "AHCH",
	secret: "boy it sure would be unfortunate if this string was leaked",
	resave: false,
	saveUninitialized: true
  }));

// Bring in Models
let Patient = require('./models/new_chims_models/case/patient/patient');
// let p = new Patient();

// p.patientID = 123;
// p._id = 5e97cf077519c94072eab717;

// Patient.create(p);
Patient.find({}, (err, patients) => {
	console.log(patients)
});


// Set Static Public Folder
const static = express.static(__dirname + '/public');
app.use('/public', static);

// Include Bootstrap from node_modules
const bootstrap = express.static(__dirname + '/node_modules/bootstrap');
app.use('/bootstrap', bootstrap);

// Include Fullcalendar from node_modules
const fullcalendar = express.static(__dirname + '/node_modules/@fullcalendar');
app.use('/@fullcalendar', fullcalendar);

// Include jQuery from node_modules
const jquery = express.static(__dirname + '/node_modules/jquery');
app.use('/jquery', jquery);



// Middleware to Recognize JSON in Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine Setup: Handlebars (extension .hbs)
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'hbs');

var hbs = exphbs.create({});

hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

var DateFormats = {
    short: "DD MMMM - YYYY",
    long: "dddd DD.MM.YYYY HH:mm",
    comments: "DD/MM/YYYY HH:mm"
};

hbs.handlebars.registerHelper("formatDate", function(datetime, format) {
    if (moment) {
      // can use other formats like 'lll' too
      format = DateFormats[format] || format;
      return moment(datetime).format(format);
    }
    else {
      return datetime;
    }
  });

// Configure Routing from ./routes
const configRoutes = require('./routes');
configRoutes(app);

// Run Server
app.listen(3000, () => {
	console.log("Server running.");
	console.log('Routes will be running on http://localhost:3000');
});
