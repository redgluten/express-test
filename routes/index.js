var express = require('express');
var router  = express.Router();
var db      = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yo-Mama' });
})
.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
})
.post('/login', function(req, res, next) {
  // Validate the request
  req.checkBody('email', 'Email invalid')
    .notEmpty().withMessage('Email required')
    .isEmail();
  req.checkBody('password', 'Password invalid')
    .notEmpty()
    .len(6, 20).withMessage('The password must be between 6 and 20 charachters');
  req.sanitizeBody('remember')
    .toBoolean();

  var formErrors = req.validationErrors(true);

  if (formErrors) {
    res.render('auth/login', { title: 'Login', errors: formErrors });
  } else {
    // DB connect
    connection = db.connect();

    query = 'SELECT COUNT(*) AS auth FROM user WHERE ' +
                'email = "' + req.body.email + '" ' +
                'AND password = "' + req.body.password + '";';

    // authentication
    connection.query(query, function(err, results) {
      if (err) throw err;

      if (results[0].auth == 1) {
        res.redirect('/');
      } else {
        res.render('auth/login', { title: 'Login', errors: { "msg": "DB Error" } });
      }
    });
  }
});

module.exports = router;
