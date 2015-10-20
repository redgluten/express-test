var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yo-Mama' });
})
.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Login' });
})
.post('/login', function(req, res, next) {
    // Validate the request
    console.log(req.body);
});

module.exports = router;
