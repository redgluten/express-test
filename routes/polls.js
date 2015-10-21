var express         = require('express');
var router          = express.Router();
var pollsController = require('../controllers/polls');

/* GET polls listing. */
router.get('/', pollsController.index);

// Show
router.get('/polls/:polls', pollsController.show);

// Create
// router.get('/polls/create', pollsController.create);

// Store
// router.post('/polls/', pollsController.store);

// Edit
// router.post('/polls/:polls/edit', pollsController.edit);

// Update
// router.post('/polls/:polls/', pollsController.update);

module.exports = router;
