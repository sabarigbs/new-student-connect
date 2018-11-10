var LocalStrategy = require('passport-local').Strategy;
var db = require('../services/dbConnection');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    if(user['role'] === 'student'){
      keyToUse = 'student_id';
    }else{
      keyToUse = 'faculty_id';
    }
    done(null, {
      id:user[keyToUse],
      role: user['role']
    });
  });

  passport.deserializeUser(function(user, done) {
    console.log("deserialize", user);
    var tableName;
    var columnName;
    if(user['role'] === 'student'){
      tableName = 'students';
      columnName = ['student_id'];
    }else{
      tableName = 'faculty';
      columnName = ['faculty_id'];
    }
    db.query("SELECT * FROM ?? WHERE ?? = ?", [tableName,columnName,user['id']], function(
      err,
      data,
      fields
    ) {
      done(err, data[0]);
    });
  });

  passport.use(new LocalStrategy({passReqToCallback:true},
    function(req,username,password,done){
      var tableName;
      var columnName;
      if(req.body.role == 'student'){
        tableName = 'students';
        columnName = ['student_id'];
      }else{
        tableName = 'faculty';
        columnName = ['faculty_id'];
      }

      console.log(username,password,req.body.role);
      db.query("SELECT * FROM ?? WHERE ?? = ?",[tableName,columnName,username],function(err,data,fields){
        if(err){
          return done(err);
        }
        if(data.length === 0){
          return done(null,false);
        }
        if(data[0]['password'] !== password){
          return done(null,false);
        }
        data[0]['role']=req.body.role;
        return done(null,data[0]);
      })
    }
  ));
  
};
