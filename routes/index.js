var express         = require('express');
var router          = express.Router();
var indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.index);

// Login
router.get('/login', indexController.login);
router.post('/login', indexController.auth);

// Logout
router.get('/logout', indexController.logout);

module.exports = router;
