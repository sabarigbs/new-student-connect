var db = require('../services/dbConnection');

var facultyController = {

    getMarksBySubject : function(req,res,next){
      
        db.query(`SELECT student_id,course_name,marks,remarks FROM marks NATURAL JOIN enrollments NATURAL JOIN courses WHERE teaches_id = (SELECT teaches_id FROM teaches WHERE faculty_id = ? AND course_id = ? ) AND occurrence_id = ? `,[req.params.facultyId,req.query.course_id,req.params.occurrenceId],function(err,data,fields){
            if(err)
                throw err;
            message={data};
            res.json(message);
        });

    }

};

module.exports = facultyController;