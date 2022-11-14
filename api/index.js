require("dotenv").config({ path: "secrets/.env" });
const express = require("express");

const cors = require("cors");

const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("./passport");
const ProductRoutes = require("./routes/products.routes");
const CartRoutes = require("./routes/cart.routes");

const sequelize = require("./models/index");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

// Import morgan-body
const morganBody = require("morgan-body");
const { ensureLoggedIn } = require("./middlewares/Auth");

// use morgan-body
morganBody(app);

// Sync models
sequelize.sync({});

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

// Public
app.use("/auth", authRoutes);

//product routes
app.use(express.json());
app.use("/api/products", ProductRoutes);

app.use("/api/cart", CartRoutes);
// app.use("/api/order", OrderRoutes);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening to port ${PORT}`);
});

// 3 Routes
// 1. Admin (Is protected)
// 2. User (Is protected)
// 3. Public (Is not protected)
