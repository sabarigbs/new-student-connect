var express = require('express');
var router = express.Router();
var facultyController = require('../controllers/facultyController');


router.get('/:facultyId/marks/:occurrenceId',facultyController.getMarksBySubject);
router.post('/:facultyId/marks/:occurrenceId',facultyController.insertMarksBySubject);


router.post('/:facultId/attendance',facultyController.insertSubjectwiseAttendance);


module.exports = router;
