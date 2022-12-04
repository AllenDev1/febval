//Order Routes
const express = require("express");
const router = express.Router();
const { Order, User, Product, Cart } = require("../models/index");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

router.post("/checkout", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const { productId, quantity, total, status, address } = req.body;
		const order = await Order.create(
			{
				userId: user.id,
				productId: productId,
				quantity: quantity,
				address: address,
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

//list of orders by user

router.get("/list", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const orders = await Order.findAll({
			where: { userId: user.id },
			include: Product.Order,
			as: "order",
		});
		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//list of orders by admin

router.get("/list/admin", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const orders = await Order.findAll({
			include: Product.Order,
			as: "order",
		});
		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
