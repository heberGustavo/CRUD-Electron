const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electrondb'
});

function getConnection() {
    return connection;
}

//Para pode usar em outro lugar
module.exports = { getConnection }