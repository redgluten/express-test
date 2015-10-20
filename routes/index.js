var express = require('express');
var router  = express.Router();
var db      = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Yo-Mama',
    auth: req.session.auth,
    identity: req.session.identity
  });
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

    // authentication
    connection.query('SELECT COUNT(*) AS auth FROM user WHERE ' +
                'email = "' + req.body.email + '" ' +
                'AND password = "' + req.body.password + '";',
      function(err, results) {
        if (err) throw err;

        if (results[0].auth == 1) {
          connection.query('SELECT * FROM user WHERE ' +
                  'email = "' + req.body.email + '" ' +
                  'AND password = "' + req.body.password + '";',
          function(err, results) {
            if (err) throw err;
            req.session.identity = {
              id: results[0].id,
              name: results[0].name,
              login: results[0].login,
              email: results[0].email
            }
            req.session.auth = true;
            res.redirect('/');
          });
        } else {
          req.session.auth = false;
          res.redirect('/');
        }
      });
    }
})
.get('/logout', function(req, res, next) {
  req.session.auth     = false;
  req.session.identity = null;
  res.redirect('/');
});

module.exports = router;
