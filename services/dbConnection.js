var mysql = require('mysql');
var config = require('../config/dbConfig').CLOUD;

var connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    timezone:+0530
});

connection.connect(function(err) {
    if (err) 
        throw err;
});

module.exports = connection;

