var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authenticationMiddleWare = require('../middlewares/checkAuthenticated');

router.get('/:role/:userId',authenticationMiddleWare.isAuthenticated,userController.getInfo);



module.exports = router;
