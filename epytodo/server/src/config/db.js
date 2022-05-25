const mysql = require('mysql2');
const env = require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect(function(err) {
    if (err)
        console.log(err);
    console.log('Connected to database');
});

module.exports = db;