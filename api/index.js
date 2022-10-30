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
const axios = require("axios");
// require("./database/index.js");

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

app.get("/api/token", (req, res) => {
    const auth_code = req.query.code;
    const state = req.query.state;
	const options = {
		method: "POST",
		url: `https://dev-vbeq9sic.us.auth0.com/oauth/token`,
		headers: { "content-type": "application/x-www-form-urlencoded" },
		data: new URLSearchParams({
			grant_type: "authorization_code",
			client_id: process.env.AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			code: auth_code,
            redirect_uri: process.env.AUTH0_REDIRECT_URI,
            state:state
		}),
	};

	axios
		.request(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			res.send(error);
		});
});

app.use("/api/*", jwtCheck, ProtectedRoutes);

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening to port ${PORT}`);
});
