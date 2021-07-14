const express = require('express');
const data = require('../data');
const patientData = data.patients;
const router = express.Router();



/* GET cases page */
router.get('/', function (req, res, next) {
  let Case = require('../models/case');
  // let caseList = {};

  Case.findOne({}, (err, cases) => {
    // caseList = JSON.parse(JSON.stringify(cases));
    // Object.assign(caseList, cases);
    // console.log(caseList);
  });

  // console.log(caseList);

  res.render('cases/caselist', {
    title: 'Case List',
    layout: 'cases',
  });
});

router.get('/caseinfo', function (req, res, next) {
  res.render('cases/caseinfo', {
    title: 'Case Info',
    layout: 'cases'
  });
});

router.get('/referral', async (req, res, next) => {
  res.render('cases/referral', {
    title: 'Case Referrals',
    layout: 'cases'
  });
});

router.get('/patients', async (req, res, next) => {
  // caseId = req.params.caseId
  // patientArr = patientData.getAllPatients(caseId)
  res.render('cases/patients', {
    title: 'Case Patients',
    // patients: patientArr,
    layout: 'cases'
  });
});

router.get('/patients/edit/new', async (req, res, next) => {
  console.log(req.query)
  let form = {};
  if (req.query.patientPopSelector == "name1") {
    form.medicalRef = 202020
    form.firstName = "Elijah"
    form.lastName = "Wendel"
    form.middleInitial = "Z"
    form.guardianID = "name2"
  }
  res.render('cases/patientForm', {
    title: 'Case Patients',
    layout: 'cases',
    form: form
  });
});

router.get('/patients/edit/:id', async (req, res, next) => {
  let form = {};
  if (req.params.id == "name1") {
    form.medicalRefNum = 202020
    form.firstName = "Elijah"
    form.lastName = "Wendel"
    form.middleInitial = "Z"
  }
  res.render('cases/patientForm', {
    title: 'Case Patients',
    layout: 'cases',
    form: form
  });
});

router.get('/medical', async (req, res, next) => {
  res.render('cases/medical', {
    title: 'Case Medical',
    layout: 'cases'
  });
});

router.get('/family', async (req, res, next) => {
  res.render('cases/family', {
    title: 'Case Family',
    layout: 'cases'
  });
});

router.get('/family/edit', async (req, res, next) => {
  res.render('cases/familyForm', {
    title: 'Case Family',
    layout: 'cases'
  });
});

router.get('/history', async (req, res, next) => {
  res.render('cases/history', {
    title: 'Case History',
    layout: 'cases'
  });
});

router.get('/services', async (req, res, next) => {
  res.render('cases/services', {
    title: 'Case Services',
    layout: 'cases'
  });
});

router.get('/staff', async (req, res, next) => {
  res.render('cases/staff', {
    title: 'Case Staff',
    layout: 'cases'
  });
});

router.get('/mentalhealth', async (req, res, next) => {
  res.render('cases/mentalhealth', {
    title: 'Case Mental Health',
    layout: 'cases'
  });
});

router.get('/recommendation', async (req, res, next) => {
  res.render('cases/recommendation', {
    title: 'Case Recommendation',
    layout: 'cases'
  });
});

router.get('/familyrecommendation', async (req, res, next) => {
  res.render('cases/familyrecommendation', {
    title: 'Case Family Recommendation',
    layout: 'cases'
  });
});

router.get('/notes', async (req, res, next) => {
  res.render('cases/notes', {
    title: 'Case Notes',
    layout: 'cases'
  });
});

module.exports = router;
