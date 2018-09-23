var db = require('../services/dbConnection');
var statusCodes = require('../constants/httpStatusCodes');
var response = require('../services/responseFormat');

var studentController = {
    
    // This function fetches mark displaying students CAT wise
    getMarks : function(req,res,next){
        
        var message;

        db.query('SELECT student_id,student_name,course_id,course_name,mark_id,marks FROM students NATURAL JOIN enrollments NATURAL JOIN courses NATURAL JOIN marks WHERE student_id = ? AND occurrence_id = ?',[req.params.studentId,req.params.occurrenceId],function(err,data,fields){
            
            if(err){
               console.log(err);
               response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            }else if(data.length !== 0 && data[0] !== undefined){
            
                message={
                    'success':true,
                    'rollno':data[0]['student_id'],
                    'studentName':data[0]['student_name'],
                    'marks':data,
                }

                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            
        });
    },

    // This function updates remarks for a mark
    updateRemarks : function(req,res,next){
        
        db.query(`UPDATE marks SET remarks = ? WHERE mark_id= ? WHERE onduty_id = ? `,[req.body.remarks,req.params.markId],function(err,data,fields){
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

    // This function retrieves attendance of a particular student
    getAttendance : function(req,res,next){
        
        db.query(`SELECT 
            date,
            max(case when period = 1 then "ABSENT" end) period1,
            max(case when period = 2 then "ABSENT" end) period2,
            max(case when period = 3 then "ABSENT" end) period3,
            max(case when period = 4 then "ABSENT" end) period4,
            max(case when period = 5 then "ABSENT" end) period5,
            max(case when period = 6 then "ABSENT" end) period6,
            max(case when period = 7 then "ABSENT" end) period7 
            FROM student_attendance INNER JOIN students ON student_attendance.student_id = students.student_id WHERE student_attendance.student_id = ? 
            GROUP BY date`,[req.params.studentId],function(err,data,fields){
            
            if(err)
               response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            message={
                'success':true,
                'data':data
            };
            
            res.json(message);
        });
    },

    // This function retrieves the onduty requests applied by a student
    viewAppliedOnDuty : function(req,res,next){

        db.query(`SELECT 
            date,
            max(case when period = 1 then onduty_id end) period1,
            max(case when period = 2 then onduty_id end) period2,
            max(case when period = 3 then onduty_id end) period3,
            max(case when period = 4 then onduty_id end) period4,
            max(case when period = 5 then onduty_id end) period5,
            max(case when period = 6 then onduty_id end) period6,
            max(case when period = 7 then onduty_id end) period7 
            FROM on_duty INNER JOIN students ON on_duty.student_id = students.student_id WHERE on_duty.student_id = ?
            GROUP BY date `,[req.params.studentId],function(err,data,fields){
            if(err)
               response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.length !== 0){
                    message={
                    'success':true,
                    data
                };
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
        })
    },


    // This function updates the applied onduty information of a student
    updateAppliedOnDuty : function(req,res,next){

        db.query(`UPDATE on_duty SET period = ? reason = ? date = ?`,[],function(err,data,fields){
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

    // This function deletes the applied onduty of student
    deleteOnDutyRequest : function(req,res,next){
        db.query(`DELETE FROM on_duty WHERE onduty_id = ? `,[req.params.ondutyId],function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.affectedRows === 1){
                message = {
                    'success':true,
                    'message':'Onduty request deleted successfully!'
                }
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else{
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            }
            
        });
    }


};

module.exports = studentController;