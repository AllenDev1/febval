const express = require("express");
const bodyParser = require("body-parser");

const  { CONNECTION } = require("./src/confg/dbConnection.js")

const app = express();
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
