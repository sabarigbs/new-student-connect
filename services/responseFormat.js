var statusCodes = require('../constants/httpStatusCodes');

var response = {


    sendSuccessResponse : function(res,statusCode,message){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.status(statusCode).json(message);
    },

    sendErrorResponse : function(res,statusCode){
        var message;

        if(statusCode === statusCodes.INTERNAL_SERVER_ERROR){
            message = {
                'success' : false,
                'message' : 'Internal Server Error, Please try again after sometime'
            };
        }

        if(statusCode === statusCodes.UNAUTHORIZED){
            message = {
                'success' : false,
                'message' : 'Unauthorized user, Invalid credentials'
            };
        }

        if(statusCode === statusCodes.NOT_FOUND){
            message = {
                'success' : false,
                'message' : 'Could not find the record'
            };
        }
       res.status(statusCode).json(message);
    }


};

module.exports = response;