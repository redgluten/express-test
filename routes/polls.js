var express = require('express');
var router  = express.Router();

/* GET polls listing. */
router.get('/', function(req, res, next) {
  res.render('polls/index', { title: 'Polls' });
});

// List
router.get('/list', function(req, res, next) {
  // res.render('polls/index', { title: 'Polls' });
});

// Show
router.get('/polls/:polls', function(req, res, next) {
  res.render('polls/show', { poll: req.params.polls, title: 'Poll ' });
});

// Create
router.get('/polls/create', function(req, res, next) {
  res.render('polls/create', { title: 'Create a new poll' });
});

module.exports = router;
