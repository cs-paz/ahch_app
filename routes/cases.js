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

router.get('/:caseId/referral', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/referral', {
    title: 'Case Referrals',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
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
  console.log('caseId working ig')
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
  console.log("correct patient");

  try {
    patient = await patientData.update(req.params.id, form)
  } catch (e) {
    console.log(e)
    res.status(500).render('error');
    return;
  }
  res.redirect(`/cases/${req.params.caseId}/patients`);
  return patient;
});

router.get('/:caseId/medical', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)
  
  res.render('cases/medical', {
    title: 'Case Medical',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/family', async (req, res, next) => {
  caseId = req.params.caseId;
  familyArr = await data.family.getFamily(caseId);
  console.log(familyArr);
  res.render('cases/family', { 
    title: 'Case Family',
    family: familyArr,
    layout: 'cases',
    caseId: caseId,
  });
});

router.get('/:caseId/family/edit/new', async (req, res, next) => {
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
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/family/edit/new', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let familyMember;
  form.caseId = req.params.caseId;
  try {
    familyMember = await familyData.add(form)
  } catch (e) {
    res.status(500).render('error');
  }
  res.redirect(`/cases/${req.params.caseId}/family`);
  return familyMember;
});

router.get('/:caseId/family/edit/:id', async (req, res, next) => {
  let form = {};
  console.log("correct family");
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
    familyId: req.params.id,
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/family/edit/:id', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let familyMember;
  try {
    familyMember = await familyData.update(req.params.patientId, form)
  } catch (e) {
    res.status(500).render('error');
  }
  res.redirect(`/cases/${req.params.caseId}/family`);
  return familyMember;
});


router.get('/:caseId/history', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/history', {
    title: 'Case History',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/services', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)
  
  res.render('cases/services', {
    title: 'Case Services',
    caseInfo: caseInfo,
    layout: 'cases',
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/services/edit/new', async (req, res, next) => {
  res.render('cases/servicesForm', {
    title: 'Case Services',
    layout: 'cases',
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/services/edit/new', async (req, res, next) => {
  let form = req.body; // have to add error checking/xss
  let service;
  form.caseId = req.params.caseId;
  try {
    service = await serviceData.add(form)
  } catch (e) {
    res.status(500).render('error');
  }

  res.redirect(`/cases/${req.params.caseId}/services`);
  return service;
});

router.get('/:caseId/services/edit/:id', async (req, res, next) => {
  let form = {};
  try {
    form = await data.services.getService(req.params.id);
  } catch (e) {
    res.status(500).render('error');
  }
  res.render('cases/servicesForm', {
    title: 'Case Patients',
    layout: 'cases',
    form: form,
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/services/edit/:id', async (req, res, next) => {
  let form = req.body // have to add error checking/xss
  let service;
  try {
    service = await data.services.update(req.params.id, form)
  } catch (e) {
    res.status(500).render('error');
  }
  res.redirect(`/cases/${req.params.caseId}/services`);
  return service;
});

router.get('/:caseId/staff', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/staff', {
    title: 'Case Staff',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/mentalhealth', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/mentalhealth', {
    title: 'Case Mental Health',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/recommendation', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/recommendation', {
    title: 'Case Recommendation',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/familyrecommendation', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)

  res.render('cases/familyrecommendation', {
    title: 'Case Family Recommendation',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.get('/:caseId/notes', async (req, res, next) => {
  let caseInfo = await data.cases.getCase(req.params.caseId)
  caseInfo.caseNotes.reverse();

  res.render('cases/notes', {
    title: 'Case Notes',
    layout: 'cases',
    caseInfo: caseInfo,
    caseId: req.params.caseId,
  });
});

router.post('/:caseId/notes/addnote', async (req, res, next) => {
  let form = req.body;
  console.log(req.session)
  if (req.session.user) {
    form.username = req.session.user.username;
  }
  form.caseId = req.params.caseId;
  let note;
  try {
    note = await data.notes.add(form)
  } catch (e) {
    console.log(e);
    res.status(500).render('error');
    return;
  }
  res.redirect(`/cases/${req.params.caseId}/notes`);
  return;
});

module.exports = router;
