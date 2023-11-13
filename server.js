//require mysql2
const mysql2 = require('mysql2');

//create the connection to the mysql database
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db',
});

