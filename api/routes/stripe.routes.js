const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const route = require("express").Router();
const uuid = require("uuid").v4;

const { ensureLoggedIn } = require("../middlewares/Auth");

route.post("/checkout", ensureLoggedIn, async (req, res) => {
	console.log("Request:", req.body);

	let error;
	let status;
	try {
		const { product, token } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		const idempotencyKey = uuid();

		const charge = await stripe.charges.create(
			{
				amount: product.price * 100,
				currency: "inr",
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the ${product.name}`,
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip,
					},
				},
			},
			{
				idempotencyKey,
			}
		);
		console.log("Charge:", { charge });
		status = "success";
	} catch (error) {
		console.error("Error:", error);
		status = "failure";
	}

	res.json({ error, status });
});

module.exports = route;
