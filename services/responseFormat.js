var statusCodes = require('../constants/httpStatusCodes');

var response = {


    sendSuccessResponse : function(res,startusCode,message){
        res.status(startusCode).json(message);
    },

    sendErrorResponse : function(res,statusCode){
        var message;

        if(statusCode === statusCodes.INTERNAL_SERVER_ERROR){
            message = {
                'success' : false,
                'message' : 'Internal Server Error, Please try again after sometime'
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