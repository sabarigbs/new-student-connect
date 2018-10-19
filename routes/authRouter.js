var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var db = require('../services/dbConnection');
var response = require('../services/responseFormat');
var statusCodes = require('../constants/httpStatusCodes');


passport.use(new LocalStrategy({passReqToCallback:true},
  function(req,username,password,done){
    console.log(req.body.role);
    db.query("SELECT * FROM students WHERE student_id = ?",[username],function(err,data,fields){
      if(err){
        return done(err);
      }
      if(data.length === 0){
        return done(null,false);
      }
      if(data[0]['password'] !== password){
        return done(null,false);
      }
      return done(null,data[0]['student_id']);
    })
  }
));

passport.serializeUser(function(id,done){
  done(null,id);
});

passport.deserializeUser(function(id,done){
  db.query("SELECT * FROM students WHERE student_id = ?",[id],function(err,data,fields){
    done(err,data[0]);
  });
});

router.post('/signup', function(req, res, next) {
  
});

router.post('/login',passport.authenticate('local'), function(req, res, next) {
    console.log(req.isAuthenticated());
    message = {
      'success':true
    };
    response.sendSuccessResponse(res,statusCodes.OK,message);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  message = {
    'success':true
  };
  response.sendSuccessResponse(res,statusCodes.OK,message);
});

module.exports = router;
