//Order Routes
const express = require("express");
const router = express.Router();
const { Order, User, Product, ProductOrder } = require("../models/index");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

router.post("/checkout", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const { productId, quantity } = req.body;

		const product = await Product.findAll({
			where: {
				id: productId,
			},
		});

		if (!product) throw "Product doesn't exist";

		const order = await Order.create({
			orderComplete: false,
			deliveryType: "cod",
			userId: user.id,
		});

		product.forEach(async (product) => {
			const productOrder = await ProductOrder.create({
				quantity: quantity,
				orderId: order.id,
				productId: product.id,
			});
		});

		const result = await Order.findOne({
			id: order.id,
		});

		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/orders", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const orders = await Order.findAll({
			where: {
				userId: user.id,
			},
			include: [
				{
					model: Product,
					attributes: ["price", "name"],
					through: {
						attributes: ["quantity"],
					},
				},
			],
		});

		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
