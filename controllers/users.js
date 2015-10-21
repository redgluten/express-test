var db = require('../lib/db');

exports.index = function(req, res, next) {
  res.send('respond with a resource');
};

exports.show = function(req, res, next) {
  // DB connect
  connection = db.connect();

  // authentication
  connection.query('SELECT * FROM user WHERE id = "' + req.params.users + '";', function(err, results) {
      if (err) throw err;
      console.log(results);
      res.render('users/show', { title: 'User ' + results[0].name, user: results[0] });
  });
};
