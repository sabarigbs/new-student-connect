var express = require('express');
var router = express.Router();
var facultyController = require('../controllers/facultyController');
var authenticationMiddleware = require('../middlewares/checkAuthenticated');

//Routes that deal with marks 
router.get('/:facultyId/marks/:occurrenceId',authenticationMiddleware.isAuthenticated,facultyController.getMarksBySubject);
router.post('/:facultyId/marks/:occurrenceId',authenticationMiddleware.isAuthenticated,facultyController.insertMarksBySubject);

//Routes that deal with attendance
router.post('/:facultId/attendance',authenticationMiddleware.isAuthenticated,facultyController.insertSubjectwiseAttendance);


//Routes that deal with onduty


module.exports = router;
