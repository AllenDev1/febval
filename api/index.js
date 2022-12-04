require("dotenv").config({ path: "secrets/.env" });
const express = require("express");

const cors = require("cors");

const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("./passport");
const ProductRoutes = require("./routes/products.routes");

const OrderRoutes = require("./routes/order.routes");
const UserRoutes = require("./routes/user.routes");
const SearchRoute = require("./routes/search.routes");
const { sequelize } = require("./models/index");
const CarouselRoutes = require("./routes/carousel.routes");
const salesBanner = require("./routes/salesBanner.routes");
const NewsLetterRoutes = require("./routes/newsLetter.routes");
const StripePaymentRoutes = require("./routes/stripe.routes");
const PaytemRoutes = require("./routes/paytm.routes");
const startAdmin = require("./admin/app");

const app = express();
const PORT = process.env.EXPRESS_PORT | 3001;

// Import morgan-body
const morganBody = require("morgan-body");
const { ensureLoggedIn } = require("./middlewares/Auth");

// use morgan-body
morganBody(app);

// Sync models
sequelize.sync({});

// Admin
startAdmin(app);

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

app.use("/api/order", OrderRoutes);

app.use("/api/carousel", CarouselRoutes);
app.use("/api/newsletter", NewsLetterRoutes);
app.use("/api/salesbanner", salesBanner);

app.use("/api/user", UserRoutes);

app.use("/api/search", SearchRoute);

app.use("/api/stripe", StripePaymentRoutes);
app.use("/api/paytm", PaytemRoutes )

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening to port ${PORT}`);
});

// 3 Routes
// 1. Admin (Is protected)
// 2. User (Is protected)
// 3. Public (Is not protected)
