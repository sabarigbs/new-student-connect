var mysql = require('mysql');


var connection = mysql.createConnection({
    host:"db4free.net",
    user:"sabari",
    password:"sabari.b",
    database:"student_connect"
});

connection.connect(function(err) {
    if (err) 
        throw err;
});

module.exports = connection;

