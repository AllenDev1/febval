// Load Environment Variables
require("dotenv").config({ path: "secrets/.env" });

// Imports
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const { expressjwt: jwt } = require("express-jwt");
// const jwks = require("jwks-rsa");
// const ProtectedRoutes = require("./routes/ProtectedRoutes");
// const axios = require("axios");
// const auth_middleware = require("./middlewares/oauth.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("./passport");
const { Sequelize } = require("sequelize");
// require("./database/index.js");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

// const db = new Sequelize({
// 	dialect: 'mysql',
// 	storage: "./mysql/MyDB.sql"
//   });

//   try {
// 	 db.authenticate();
// 	console.log('Connection has been established successfully.');
//   } catch (error) {
// 	console.error('Unable to connect to the database:', error);
//   }
app.use(
	cookieSession({
		name: "session",
		keys: [process.env.KEY],
		maxAge: 24 * 60 * 60 * 1000,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRoutes);

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening to port ${PORT}`);
});
