const router = require("express").Router();
const { Order, User, Product, Cart } = require("../models/index");

// cash on delivery

router.post("/cod", async (req, res) => {
	try {
		const { name, email, phone, address, total, cart } = req.body;
		const order = await Order.create({
			name: name,
			email: email,
			phone: phone,
			address: address,
			total: total,
			cart: cart,
			status: "Order Placed",
		});
		res.status(201).json({ order });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
