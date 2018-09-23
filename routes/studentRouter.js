var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController');

// Routes that deal with marks
router.get('/:studentId/marks/:occurrenceId', studentController.getMarks);
router.put('/marks/:markId',studentController.updateRemarks);

// Routes that deal with attendance
router.get('/:studentId/attendance', studentController.getAttendance);

// Routes that deal with onduty
router.get('/:studentId/onduty', studentController.viewAppliedOnDuty);

module.exports = router;
