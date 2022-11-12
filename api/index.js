require("dotenv").config({ path: "secrets/.env" });
const express = require("express");

const cors = require("cors");

const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("./passport");

const sequelize = require("./database/sequelize");
const User = require("./models/user.model");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

// Import morgan-body
const morganBody = require("morgan-body");

// use morgan-body
morganBody(app);

// Sync models
sequelize.sync();

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
