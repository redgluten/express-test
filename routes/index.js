var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yo-Mama' });
})
.get('/login', function(req, res, next) {
    res.render('auth/login');
});

module.exports = router;
