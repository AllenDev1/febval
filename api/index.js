// Load Environment Variables
require("dotenv").config({ path: "secrets/.env" });

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const ProtectedRoutes = require("./routes/ProtectedRoutes");
require("./database/index.js");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_jwksUri,
    }),
    audience: process.env.AUTH0_audience,
    issuer: process.env.AUTH0_issuer,
    algorithms: ["RS256"],
});

app.use("/api", jwtCheck, ProtectedRoutes);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening to port ${PORT}`);
});


app.get("/", (req, res) => {
	res.send("Hello World!");
});