const express = require('express');
const router = express.Router();
const caseData = require('../data/cases');

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

router.post('/submitIntake', async (req, res) => {
  let caseBody = {};

  caseBody.caseworkerNameCPP = req.body.caseworkerNameCPP;
  caseBody.caseworkerNumberCPP = req.body.caseworkerNumberCPP;
  caseBody.caseworkerEmailCPP = req.body.caseworkerEmailCPP;
  caseBody.supervisorNameCPP = req.body.supervisorNameCPP;
  caseBody.supervisorNumberCPP = req.body.supervisorNumberCPP;
  caseBody.supervisorEmailCPP = req.body.supervisorEmailCPP;
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
