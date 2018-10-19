var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController');
var authenticationMiddleWare = require('../middlewares/checkAuthenticated');

// Routes that deal with marks
router.get('/:studentId/marks/:occurrenceId',authenticationMiddleWare.isAuthenticated,studentController.getMarks);
router.put('/marks/:markId',authenticationMiddleWare.isAuthenticated,studentController.updateRemarks);

// Routes that deal with attendance
router.get('/:studentId/attendance',authenticationMiddleWare.isAuthenticated, studentController.getAttendance);

// Routes that deal with onduty
router.get('/:studentId/onduty',authenticationMiddleWare.isAuthenticated, studentController.viewAppliedOnDuty);
router.post()
router.put('/:studentId/onduty/:ondutyId',authenticationMiddleWare.isAuthenticated,studentController.updateAppliedOnDuty);
router.delete('/:studentId/onduty/:ondutyId',authenticationMiddleWare.isAuthenticated,studentController.deleteOnDutyRequest);
module.exports = router;
