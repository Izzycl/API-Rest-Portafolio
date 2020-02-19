const mysql = require('mysql');
const dbconfig = require('../config/db.config');

const con = mysql.createConnection({
    host: dbconfig.HOST,
    port: dbconfig.PORT,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB,
    user: dbconfig.USER
})

con.connect(err =>{
    if(err) throw console.log(`Error en la connexion a la base de datos ${err}`);
    console.log(`Conexion exito a base de datos ${dbconfig.DB}`);
    
})

module.exports = con;
