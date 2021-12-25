const express = require('express');
const router = express.Router();
const caseData = require('../data/cases');
const fs = require('fs');
const PDFParser = require("pdf2json");
const Base64 = require('js-base64');
const multer = require('multer');
const upload = multer();
const hummus = require('hummus');
const PDFDigitalForm = require('./pdf-digital-form');
var pdfFiller = require('pdffiller');

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}


const scripts = [
  { script: '/public/js/setCurrentDate.js' }];

// stylesheets sent to layout.hbs
const stylesheets = [
  { stylesheet: '/public/css/sidebar-menu-addcase.css' }];


/* GET addcase page */
router.get('/', async (req, res, next) => {
  res.render('addcase', {
    title: 'Add Case',
    scripts: scripts,
    stylesheets: stylesheets
  });
});


router.post('/fillIntake', upload.single('form'), async (req, res) => {
  let pdfParser = new PDFParser(); // pdf parsing stuff
  // let pdfAsDataUri;
  // for (i in req.body) {
  //   // fs.writeFile("./AHCHFormFilled.txt", i, ()=>{console.log("Done.");});
  //   pdfAsDataUri = i.toString().replace('data:application/pdf;base64,', '')
  // }

  // // fs.writeFile("./AHCHFormFilled.txt", JSON.stringify(req.body), ()=>{console.log("Done.");});
  // // console.log(req.body)

  // // fs.writeFile("./new-text.txt", pdfAsDataUri, ()=>{console.log("Done.");});
  // // let pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
  // console.log(pdfAsDataUri)
  // // fs.writeFile("./AHCHFormFilled.pdf", pdfAsDataUri, 'base64', ()=>{console.log("Done.");});

  console.log(req.file);

  let jsonPdfFields;
  let returnJson = {};

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
  // fs.writeFile("./AHCHFormFilled.fields.json", JSON.stringify(pdfParser.getAllFieldsTypes()), ()=>{console.log("Done.");});
    jsonPdfFields = (pdfParser.getAllFieldsTypes());
    console.log(jsonPdfFields);
    for (i of jsonPdfFields) {
      returnJson[i.id] = i.value;
    }
    console.log(returnJson)
    return res.json(returnJson);
  });

  // pdfParser.parseBuffer(req.file.buffer);
  fs.writeFile(req.file.originalname, req.file.buffer, ()=>{console.log("Done.");});
  pdfParser.loadPDF(req.file.originalname);
  // let pdfParserHummus = hummus.createReader(req.file.originalname);
  // let digitalForm = new PDFDigitalForm(pdfParserHummus);

  // if(digitalForm.hasForm()) {
  //   console.log(digitalForm.fields);
  //   console.log(digitalForm.createSimpleKeyValue());
  // }

  // var nameRegex = null;  

  // var FDF_data = pdfFiller.generateFDFTemplate( req.file.originalname, nameRegex, function(err, fdfData) {
  //     if (err) throw err;
  //     console.log(fdfData);
  // });

});

router.post('/submitIntake', async (req, res) => {
  let caseBody = {};

  caseBody.caseworkerNameCPP = req.body.caseworkerNameCPP;
  caseBody.caseworkerNumberCPP = req.body.caseworkerNumberCPP;
  caseBody.caseworkerEmailCPP = req.body.caseworkerEmailCPP;
  caseBody.supervisorNameCPP = req.body.supervisorNameCPP;
  caseBody.supervisorNumberCPP = req.body.supervisorNumberCPP;
  caseBody.supervisorEmailCPP = req.body.supervisorEmailCPyP;
  caseBody.rgName = req.body.rgName;
  caseBody.rgNumber = req.body.rgNumber;
  caseBody.rgEmail = req.body.rgEmail;
  caseBody.officeName = req.body.officeName;
  caseBody.officeAddress = req.body.officeAddress;
  caseBody.officeFaxNumber = req.body.officeFaxNumber;
  caseBody.dateSubmitted = req.body.dateSubmitted;
  caseBody.caseName = req.body.caseName;
  caseBody.spiritCaseID = req.body.spiritCaseID;
  caseBody.referredMemberName = req.body.referredMemberName;
  caseBody.spiritPersonID = req.body.spiritPersonID;

  let newCase; 
  try {
    let newCase = await caseData.add(caseBody);
  } catch (e) {
    console.log(e);
    res.status(500).render('error');
    return;
  }

  let caseId = newCase._id.toString();

  if (!Array.isArray(req.body.servicesRequested)) {
    req.body.servicesRequested = [req.body.servicesRequested]
  }

  for (i of req.body.servicesRequested) {
    let serviceBody = { caseId: caseId, service: i };
  }

  let patientBody = {};

  patientBody.firstName = req.body.patientFirstName;
  patientBody.lastName = req.body.patientLastName;
  patientBody.middleInitial = req.body.patientMiddleInitial;

  console.log(req.body);
});

module.exports = router;
