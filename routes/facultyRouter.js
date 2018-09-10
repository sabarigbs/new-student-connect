var express = require('express');
var router = express.Router();
var facultyController = require('../controllers/facultyController');


router.get('/:facultyId/marks/:occurrenceId',facultyController.getMarksBySubject);


module.exports = router;
