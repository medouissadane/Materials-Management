const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "gestion_info",
});

db.connect(err => {
    if (err) throw err;
    console.log('Base de données connectée');
});

module.exports = db;
