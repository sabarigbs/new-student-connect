var express = require('express');
var router = express.Router();


router.post('/signup', function(req, res, next) {
  res.render('index', { title: 'Signup' });
});

router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/logout', function(req, res, next) {
  res.render('index', { title: 'Logout' });
});

module.exports = router;
