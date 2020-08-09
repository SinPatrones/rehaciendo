'user strict';

var mysql = require('mysql');

CADENA_DE_CONEXION = "mysql://root:@localhost/inventariodb?charset=utf8mb4&timezone=-0500";


let connection = mysql.createConnection(CADENA_DE_CONEXION);

connection.connect(function (err) {

    if (err){
        console.log("Error al conectar con la base de datos:", err);
    }else {
        console.log('Conectado a la base de datos');
    }
});

module.exports = connection;
