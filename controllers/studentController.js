var db = require('../services/dbConnection');

var studentController = {
    
    getMarks : function(req,res,next){
        
        db.query('SELECT student_id,student_name,course_id,course_name,mark_id,marks FROM students NATURAL JOIN enrollments NATURAL JOIN courses NATURAL JOIN marks WHERE student_id = ? AND occurrence_id = ?',[req.params.studentId,req.params.occurrenceId],function(err,data,fields){
            if(err)
                throw err;
            message={
                'success':true,
                'rollno':data[0]['student_id'],
                'studentName':data[0]['student_name'],
                'marks':data,
                
            }
            res.json(message);
        });
    },

    updateMark : function(req,res,next){
        
        db.query(`UPDATE marks SET remarks = 'verified' WHERE mark_id= ?`,[req.params.markId],function(err,data,fields){
            if(err)
                throw err;
            if(data.affectedRows === 1){
                message={
                    'success':true
                };
            }
            res.json(message);
        });
        
    },

    getAttendance : function(req,res,next){

        db.query(`SELECT * FROM student_attendance WHERE student_id = ? `,[req.params.studentId],function(err,data,fields){
            if(err)
                throw err;
            message={
                'success':true
            };
            res.json(message);
        });
    },

    getOnDuty : function(req,res,next){

        db.query(`SELECT * FROM on_duty WHERE student_id = ? `,[req.params.studentId],function(err,data,fields){
            if(err)
                throw err;
            message={
                'success':true
            };
            res.json(message);
        })
    }
};

module.exports = studentController;