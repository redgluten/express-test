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

        // authentification
        // connection.query();

        // redirects
        res.redirect('/');
    }
});

module.exports = router;
