var express = require("express");
var router = express.Router();
var response = require("../services/responseFormat");
var statusCodes = require("../constants/httpStatusCodes");

module.exports = function(passport) {

  router.post("/signup", function(req, res, next) {});

  router.post("/login", passport.authenticate("local"), function(
    req,
    res,
    next
  ) {
    message = {
      success: true
    };
    response.sendSuccessResponse(res, statusCodes.OK, message);
  });

  router.get("/logout", function(req, res, next) {
    req.logout();
    message = {
      success: true
    };
    response.sendSuccessResponse(res, statusCodes.OK, message);
  });
  return router;
};
