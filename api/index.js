// Load Environment Variables
require("dotenv").config({ path: "secrets/.env" });

// Imports
const express = require("express");
const { connection } = require("./database/index.js");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening to port ${PORT}`);
});
