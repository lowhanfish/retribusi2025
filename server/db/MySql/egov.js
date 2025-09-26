var mysql = require('mysql');
var db  = mysql.createPool({
    connectionLimit : process.env.LIMIT_DB_MYSQL,
    host     : process.env.HOST_DB_MYSQL,
    user     : process.env.USER_DB_MYSQL,
    password : process.env.PASS_DB_MYSQL,
    database : 'egov'
});

db.getConnection(function(err) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log('terkoneksi DATABASE EGOV');
    }

});

module.exports = db;