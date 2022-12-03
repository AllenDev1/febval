//Order Routes
const express = require("express");
const router = express.Router();
const { Order, User, Product, Cart } = require("../models/index");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

router.post("/checkout", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const { productId, quantity, total, status } = req.body;
		const order = await Order.create(
			{
				userId: user.id,
				productId: productId,
				quantity: quantity,
				total: total,
				status: status,
			},
			{
				include: Product.Order,
				as: "order",
			}
		);
		res.status(201).json({ order });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
