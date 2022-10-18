const mysql = require("mysql");
const fs = require('fs');

let con = mysql.createConnection({
	host: "allen-febval.mysql.database.azure.com",
	user: "adminfebval",
	password: "b5cKakjeCG64cXr",
	database: "febval",
	port: 3306,
	ssl: { ca: fs.readFileSync("{ca-cert filename}") },
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports.CONNECTION = con;
