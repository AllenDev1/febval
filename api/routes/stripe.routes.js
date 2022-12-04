// stripe routes

const router = require("express").Router();
const { ensureLoggedIn } = require("../middlewares/Auth.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//stripe checkout
router.post("/payment", (req, res) => {
	stripe.charges.create(
		{
			source: req.body.token.id,
			amount: req.body.amount,
			currency: "INR",
		},
		(stripeErr, stripeRes) => {
			if (stripeErr) {
				res.status(500).json({ error: stripeErr });
			} else {
				res.status(200).json({ success: stripeRes });
			}
		}
	);
});

module.exports = router;
