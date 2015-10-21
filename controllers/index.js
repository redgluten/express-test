var db = require('../lib/db');

exports.index = function(req, res, next) {
  res.render('index', {
    title: 'Yo-Mama',
    auth: req.session.auth,
    identity: req.session.identity
  });
};

exports.login = function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
};

exports.auth = function(req, res, next) {
  // Validate the request
  var formErrors = validateRequest(req)

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

            // Set the identity and auth
            req.session.identity = getIdentity(err, results);
            req.session.auth = true;

            res.redirect('/');
          });
        } else {
          req.session.auth = false;
          res.redirect('/');
        }
      }
    );
  }
};

exports.logout = function(req, res, next) {
  req.session.auth     = false;
  req.session.identity = null;
  res.redirect('/');
};

function validateRequest(req) {
  req.checkBody('email', 'Email invalid')
    .notEmpty().withMessage('Email required')
    .isEmail();
  req.checkBody('password', 'Password invalid')
    .notEmpty()
    .len(6, 20).withMessage('The password must be between 6 and 20 charachters');
  req.sanitizeBody('remember')
    .toBoolean();

  return req.validationErrors(true);
}

function getIdentity(err, results) {
  if (err) throw err;

  return {
    id: results[0].id,
    name: results[0].name,
    login: results[0].login,
    email: results[0].email
  }
}
