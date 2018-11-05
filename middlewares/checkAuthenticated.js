var response = require('../services/responseFormat');
var statusCodes = require('../constants/httpStatusCodes');

module.exports = {
    isAuthenticated : function(req,res,next){
        if(req.isAuthenticated()){
            next()
        }
        else{
            response.sendErrorResponse(res,statusCodes.UNAUTHORIZED);
        }
    }
}