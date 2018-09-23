var db = require('../services/dbConnection');
var statusCodes = require('../constants/httpStatusCodes');
var response = require('../services/responseFormat');

var facultyController = {

    // This function will query the database to display marks of students who are attending their lectures
    getMarksBySubject : function(req,res,next){
      
        db.query(`SELECT 
        student_id,course_name,marks,remarks 
        FROM 
        marks NATURAL JOIN enrollments 
        NATURAL JOIN courses 
        WHERE teaches_id = (SELECT teaches_id FROM teaches WHERE faculty_id = ? AND course_id = ? ) AND occurrence_id = ? `,[req.params.facultyId,req.query.course_id,req.params.occurrenceId],function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.length !== 0){
                    message={
                    'success':true,
                    data
                };
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else{
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            }
            
        });

    },

    // This function updates mark of a subject depending on his remarks and proof
    updateMarks : function(req,res,next){

        db.query(`UPDATE marks SET marks = ? WHERE mark_id = ?`,[req.body.marks.req.params.markId],function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.affectedRows === 1){
                message={
                    'success':true
                };
            }
            else
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
        });

    },

    // This function will insert attendance details for a particular lecture 
    insertSubjectwiseAttendance : function(req,res,next){
        
        db.query(`INSERT INTO student_attendance(student_id,period,course_id,date) VALUES ? `,[valArr],function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else{
                message = {
                    'success':true,
                };
                response.sendSuccessResponse(res,statusCodes.RECORD_CREATED);
            }

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

    // This function allows the faculty to view their class students onduty requests and hod to view list of requests to be approved
    viewOnDutyRequests : function(req,res,next){
        db.query('',[],function(err,data,fields){

        });
    },

    // This function allows a faculty to approve/disprove the onduty request for their class studnets
    approveOnDutyRequest : function(req,res,next){
        db.query('UPDATE on_duty SET status = "Approved"',function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.affectedRows === 1){
                message = {
                    'success':true,
                    'message':'Onduty request updated successfully!'
                }
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else{
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            }
        });
    },

    // This function allows HOD to grant onduty request of a student
    grantOnDutyRequest : function(req,res,next){
        db.query('UPDATE on_duty SET status = "Granted"',function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.affectedRows === 1){
                message = {
                    'success':true,
                    'message':'Onduty request updated successfully!'
                }
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else{
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            }
        });
    },

   };

module.exports = facultyController;