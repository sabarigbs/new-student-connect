var db = require('../services/dbConnection');

var facultyController = {

    // This function will query the database to display marks of students who are attending their lectures
    getMarksBySubject : function(req,res,next){
      
        db.query(`SELECT student_id,course_name,marks,remarks FROM marks NATURAL JOIN enrollments NATURAL JOIN courses WHERE teaches_id = (SELECT teaches_id FROM teaches WHERE faculty_id = ? AND course_id = ? ) AND occurrence_id = ? `,[req.params.facultyId,req.query.course_id,req.params.occurrenceId],function(err,data,fields){
            if(err)
                throw err;
            message={data};
            res.json(message);
        });

    },

    // This function updates mark of a subject depending on his remarks and proof
    updateMarks : function(req,res,next){

    },

    // This function will insert attendance details for a particular lecture 
    insertSubjectwiseAttendance : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    }, 
    
    // This function will retrieve attendance of students attending a faculty's lecture
    viewSubjectwiseAttendance : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },

    // This function will update the inserted attendance of students attending a faculty's lecture in case of a mistake
    updateSubjectwiseAttendace : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },

    // This function allows the faculty to view their class students onduty requests
    viewClasswiseOnDuty : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },

    // This function allows a faculty to approve/disprove the onduty request for their class studnets
    approveOnDutyRequest : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },

    // This function allows HOD to grant onduty request of a student
    grantOnDutyRequest : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },
};

module.exports = facultyController;