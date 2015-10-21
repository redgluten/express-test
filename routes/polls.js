var express         = require('express');
var router          = express.Router();
var pollsController = require('../controllers/polls');

/* GET polls listing. */
router.get('/', pollsController.index);

// Create
router.get('/create', pollsController.create);

// Show
router.get('/:id', pollsController.show);

// Store
router.post('/', pollsController.store);

// Edit
// router.post('/:polls/edit', pollsController.edit);

// Update
// router.post('/:polls/', pollsController.update);

module.exports = router;
