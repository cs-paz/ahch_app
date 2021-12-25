const express = require('express');
const router = express.Router();
const data = require('../data')

/* GET admin page */
router.get('/', async (req, res, next) => {
  if (req.query.search && req.query.searchBy) {
    let search = req.query.search;
    let casesFound = []
    if (req.query.searchBy == "name") {
        try {
            casesFound = await data.cases.searchByName(search);
        } catch (e) {
            res.render('casesearch', {
                error: e,
                title: 'Case Search'
            });
            return;
        }
    } else {
        try {
            casesFound = await data.cases.searchByKC(search);
        } catch (e) {
            res.render('casesearch', {
                error: e,
                title: 'Case Search'
            });
            return;
        }
    }
    res.render('casesearch', {
        searched: true,
        title: 'Case Search',
        cases: casesFound
    });
    return;
  } else if (req.query.search || req.query.searchBy) {
    res.render('casesearch', {
        error: 'Must include both the search and what is being used to search.',
        title: 'Case Search'
    });
    return;
  }
  res.render('casesearch', {
    title: 'Case Search'
  });
});

module.exports = router;
