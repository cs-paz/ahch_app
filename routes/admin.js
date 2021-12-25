const express = require('express');
const router = express.Router();

/* GET admin page */
router.get('/', async (req, res, next) => {
  res.render('admin', {
    title: 'Admin'
  });
});

router.get('/users/', async (req, res, next) => {
  res.render('admin/users', {
    title: 'Users'
  });
});

router.get('/users/edit/new/', async (req, res, next) => {
  res.render('admin/userForm', {
    title: 'Add New User'
  });
});

router.get('/users/edit/:id/', async (req, res, next) => {
  res.render('admin/userForm', {
    title: 'Edit user'
  });
});

module.exports = router;
