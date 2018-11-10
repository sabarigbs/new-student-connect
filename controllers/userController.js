var db = require('../services/dbConnection');
var statusCodes = require('../constants/httpStatusCodes');
var response = require('../services/responseFormat');

var userController = {

    getInfo : function(req,res,next){
        var columns = req.params.role === "student" ? ["student_id","student_name","department_name","class_id"] : ["faculty_id","faculty_name","department_name"] ; 
        var tableName = req.params.role === "student" ? "students" : "faculty";
        var targetAttribute = req.params.role === "student" ? "student_id" : "faculty_id";

        db.query(`SELECT 
        ?? FROM ?? AS user 
        INNER JOIN departments ON user.department_id = departments.department_id WHERE ?? = ?`,
        [columns,tableName,targetAttribute,req.params.userId],
        function(err,data,fields){
            if(err)
                response.sendErrorResponse(res,statusCodes.INTERNAL_SERVER_ERROR);
            else if(data.length !== 0 && data[0] !== undefined){
                var message = {
                    success : true,
                    data : data[0]
                }
                response.sendSuccessResponse(res,statusCodes.OK,message);
            }
            else{
                response.sendErrorResponse(res,statusCodes.NOT_FOUND);
            }

        });
    }
}

module.exports = userController;