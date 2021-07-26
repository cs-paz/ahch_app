const { compareSync } = require('bcryptjs');
const express = require('express');
const data = require('../data');
const patientData = data.patients;
const familyData = data.family;
const serviceData = data.services;
const router = express.Router();



/* GET cases page */
router.get('/', async (req, res, next) => {
  let caseArr = await data.cases.getAllCases()

  res.render('cases/caselist', {
    title: 'Case List',
    layout: 'cases',
    cases: caseArr,
  });
});

router.get('/:caseId/caseinfo', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/caseinfo', {
    title: 'Case Info',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/referral', async (req, res, next) => {
  res.render('cases/referral', {
    title: 'Case Referrals',
    layout: 'cases'
  });
});

router.get('/:caseId/patients', async (req, res, next) => {
  let caseId = req.params.caseId;
  let patientArr = await patientData.getAllPatients(caseId);

  res.render('cases/patients', {
    title: 'Case Patients',
    patients: patientArr,
    layout: 'cases',
    caseId: caseId,
  });
});

router.get('/:caseId/patients/edit/new', async (req, res, next) => {
  let form = {};
  let caseId = await req.params.caseId;
  let patientArr = await data.patients.getAllPatients(caseId);
  let familyArr = await data.family.getFamily(caseId);
  // let languageArr = await data.language.getAllLanguages();
  // let countyArr = await data.language.getAllCounties();
  // let stateArr = await data.language.getAllStates();

  if (req.query.patientPopSelector || req.query.familyPopSelector) {
    let id;
    if (req.query.patientPopSelector) {
      id = req.query.patientPopSelector;
    } else {
      id = req.query.familyPopSelector;
    }
    try {
      form = await patientData.getPatient(id)
    } catch (e) {
      res.status(500).render('error');
    }
  }
  
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
    form: form,
    patients: patientArr,
    family: familyArr,
    // language: languageArr,
    // county: countyArr,
    // state: stateArr,
    caseId: caseId,
  });
});

router.post('/:caseId/patients/edit/new', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  form.caseId = req.params.caseId;
  let patient;
  try {
    patient = await patientData.add(form)
  } catch (e) {
    res.status(500).render('error');
  }
  res.redirect(`/cases/${req.params.caseId}/patients`);
  return patient;
});

router.get('/:caseId/patients/edit/:id', async (req, res, next) => {
  let form = {};
  let caseId = req.params.caseId;
  let patientArr = await data.patients.getAllPatients(caseId);
  let familyArr = await data.family.getFamily(caseId);
  // let languageArr = await data.language.getAllLanguages();
  // let countyArr = await data.language.getAllCounties();
  // let stateArr = await data.language.getAllStates();

  try {
    form = await patientData.getPatient(req.params.id);
  } catch (e) {
    res.status(500).render('error');
  }
  if (req.query.patientPopSelector || req.query.familyPopSelector) { // can populate when editing already existing patient as welll
    let id;
    if (req.query.patientPopSelector) {
      id = req.query.patientPopSelector;
    } else {
      id = req.query.familyPopSelector;
    }
    try {
      form = await patientData.getPatient(id)
    } catch (e) {
      res.status(500).render('error');
    }
  }

  res.render('cases/patientForm', {
    title: 'Case Patients',
    layout: 'cases',
    form: form,
    patientId: req.params.id,
    patients: patientArr,
    family: familyArr,
    // language: languageArr,
    // county: countyArr,
    // state: stateArr,
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/patients/edit/:id', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let patient;
  try {
    patient = await patientData.update(form)
  } catch (e) {
    res.status(500).render('error');
  }
  res.redirect(`/cases/${req.params.caseId}/patients`);
  return patient;
});

router.get('/medical', async (req, res, next) => {
  res.render('cases/medical', {
    title: 'Case Medical',
    layout: 'cases'
  });
});

router.get('/:caseId/family', async (req, res, next) => {
  caseId = req.params.caseId;
  familyArr = data.family.getFamily(caseId);
  res.render('cases/family', { 
    title: 'Case Family',
    family: familyArr,
    layout: 'cases',
    caseId: caseId,
  });
});

router.get('/family/edit/new', async (req, res, next) => {
  let form = {};
  if (req.query.patientPopSelector || req.query.familyPopSelector) {
    let id;
    if (req.query.patientPopSelector) {
      id = req.query.patientPopSelector;
    } else {
      id = req.query.familyPopSelector;
    }
    try {
      form = await familyData.getFamilyMember(id)
    } catch (e) {
      res.status(500).render('error');
    }
  }
  res.render('cases/familyForm', {
    title: 'Case Family',
    layout: 'cases',
    form: form,
    caseId: caseId,
  });
});

router.post('/family/edit/new', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let familyMember;
  try {
    familyMember = await familyData.add(form)
  } catch (e) {
    res.status(500).render('error');
  }
  // caseId = req.params.caseId
  // familyArr = patientData.getFamily(caseId)
  res.redirect("/cases/family");
  // res.render('cases/family', { // may just res.redirect to /cases/${caseId}/family
  //   title: 'Case Family',
  //   // family: familyArr,
  //   layout: 'cases'
  // });
  return familyMember;
});

router.get('/family/edit/:id', async (req, res, next) => {
  let form = {};
  try {
    form = await familyData.getFamilyMember(req.params.id);
  } catch (e) {
    res.status(500).render('error');
  }
  if (req.query.patientPopSelector || req.query.familyPopSelector) { // can populate when editing already existing patient as welll
    let id;
    if (req.query.patientPopSelector) {
      id = req.query.patientPopSelector;
    } else {
      id = req.query.familyPopSelector;
    }
    try {
      form = await familyData.getFamilyMember(id)
    } catch (e) {
      res.status(500).render('error');
    }
  }
  res.render('cases/familyForm', {
    title: 'Case Family',
    layout: 'cases',
    form: form,
    familyId: req.params.id
  });
});

router.post('/family/edit/:id', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let familyMember;
  try {
    familyMember = await familyData.update(form)
  } catch (e) {
    res.status(500).render('error');
  }
  // caseId = req.params.caseId
  // familyArr = patientData.getFamily(caseId)
  res.redirect("/cases/family");
  // res.render('cases/family', { // may just res.redirect to /cases/${caseId}/family
  //   title: 'Case Family',
  //   // family: familyArr,
  //   layout: 'cases'
  // });
  return familyMember;
});


router.get('/history', async (req, res, next) => {
  res.render('cases/history', {
    title: 'Case History',
    layout: 'cases'
  });
});

router.get('/services', async (req, res, next) => {
  // caseId = req.params.caseId
  // serviceArr = patientData.getAllServices(caseId)
  res.render('cases/services', {
    title: 'Case Services',
    // services: serviceArr,
    layout: 'cases'
  });
});

router.get('/services/edit/new', async (req, res, next) => {
  res.render('cases/servicesForm', {
    title: 'Case Services',
    layout: 'cases',
  });
});

router.post('/services/edit/new', async (req, res, next) => {
  let form = req.body; // have to add error checking/xss
  // let patients = form.patientOptions; // this is just incase we need to do something with patientOptions before sending it to db
  // let servicesForm = ["scheduler", "referralType", "service", "clinician", "reportSubmitted", "reportSubmittedDate", "notes"]
  // for (i in form) {
  //   console.log(i)
  //   if (!servicesForm.includes(i)) {
  //     console.log("this!")
  //   }
  // }
  let service;
  try {
    service = await serviceData.add(form)
  } catch (e) {
    res.status(500).render('error');
  }
  // caseId = req.params.caseId
  // serviceArr = patientData.getServices(caseId)
  res.redirect("/cases/services");
  // res.render('cases/services', { // may just res.redirect to /cases/${caseId}/service
  //   title: 'Case Services',
  //   // service: serviceArr,
  //   layout: 'cases'
  // });
  return service;
});

router.get('/services/edit/:id', async (req, res, next) => {
  let form = {};
  try {
    form = await familyData.getFamilyMember(req.params.id);
  } catch (e) {
    res.status(500).render('error');
  }
  res.render('cases/servicesForm', {
    title: 'Case Patients',
    layout: 'cases',
    form: form
  });
});

router.post('/services/edit/:id', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let service;
  try {
    service = await serviceData.update(form)
  } catch (e) {
    res.status(500).render('error');
  }
  // caseId = req.params.caseId
  // serviceArr = patientData.getServices(caseId)
  res.redirect("/cases/services");
  // res.render('cases/family', { // may just res.redirect to /cases/${caseId}/service
  //   title: 'Case Family',
  //   // service: serviceArr,
  //   layout: 'cases'
  // });
  // res.redirect("/cases/service")
  return service;
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
