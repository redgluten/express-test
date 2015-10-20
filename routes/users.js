var express = require('express');
var router  = express.Router();
var db      = require('../lib/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:users', function(req, res, next) {
  // DB connect
  connection = db.connect();

  // authentication
  connection.query('SELECT * FROM user WHERE id = "' + req.params.users + '";', function(err, results) {
      if (err) throw err;
      console.log(results);
      res.render('users/show', { title: 'User ' + results[0].name, user: results[0] });
  });
});

module.exports = router;
