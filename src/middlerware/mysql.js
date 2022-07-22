const mysql = require('mysql');
const myconn = require('express-myconnection');
const { promisify } = require('util')


//MySQL Options
const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootroot',
    database: 'petsitter'
}

var connection = mysql.createConnection(dbOptions);

connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log('Conectado a MySQL');
})

const query = promisify(connection.query).bind(connection);
connection.asyncQuery = query


module.exports = connection;