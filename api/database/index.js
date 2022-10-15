const mysql = require("mysql2");
const fs = require("fs");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: { ca: fs.readFileSync(process.env.AZURE_SSL_CERTIFICATE_LOCATION) },
});

connection.connect((err) => {
    if (err) {
        console.log("Couldn't connect to database: ", err);
    } else {
        console.log("Connected to the database");
    }
});

module.exports = {
    connection,
};
