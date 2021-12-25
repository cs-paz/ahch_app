const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const data = require('../data')
const userData = data.users;

/* GET admin page */
router.get('/', async (req, res, next) => {
  res.render('login', {
    title: 'Log In'
  });
});

router.post('/submitLogin/', async (req, res) => {
  let username = req.body.username
  const password = req.body.password

  console.log(req.body);

  if (!username || username.trim().length == 0) {
    return res.status(400).render('login', {
      title: 'Log In',
      error: 'Please enter a username.'
    });
  }

  if (!password || password.trim().length == 0) {
    return res.status(400).render('login', {
      title: 'Log In',
      error: 'Please enter a password.'
    });
  }

  try {
    const users = await userData.getAllUsers();

    let user = null;
    username = username.toLowerCase();

    for (i of users) { // search through all users for username
      if (i.username.toLowerCase() == username) {
        user = i;
        break;
      }
    }
    if (!user) { // if user doesn't exist, error
      console.log('incorrect username')
      return res.status(400).render('login', {
        title: 'Log In',
        error: 'Username and/or password is incorrect.'
      });
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
      console.log('incorrect password')
      return res.status(400).render('login', {
        title: 'Log In',
        error: 'Username and/or password is incorrect.'
      });
    }

    req.session.user = user; // have to change to make cookie secure
    console.log(req.session)

    return res.redirect('/home'); 
  } catch (e) {
    console.log(e);
    return res.status(500).render('login', {
      title: 'Log In',
      error: 'A database error occurred. Please try again in a few minutes.'
    });
  }
  
})

module.exports = router;
