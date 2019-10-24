const mysql = require('mysql');
const db_mysql = require("./config/keys").mysql;

const connection = mysql.createConnection(db_mysql);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado a MySQL!");
});

module.exports = connection;