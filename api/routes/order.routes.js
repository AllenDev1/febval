//Order Routes
const express = require("express");
const router = express.Router();
const { Order, User, Product, ProductOrder } = require("../models/index");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

router.post("/checkout", async (req, res) => {
	const user = req.user;
	const products = req.body.products;

	// Validate items
	for (const product_ of products) {
		const { productId, quantity } = product_;

		let p = await Product.findAll({
			where: {
				id: productId,
			},
		});

		if (!p)
			return res
				.send(500)
				.json({ error: "Product ID not found: " + productId });
		// Product is ok, check quantity
		if (quantity <= 0)
			return res.send(500).json({ error: "Quantity is invalid!" });
	}

	// Create order
	const order = await Order.create({
		orderComplete: false,
		deliveryType: "cod",
		userId: 4,
	});

	console.log("order", order.id);

	for (const product_ of products) {
		try {
			const { productId, quantity } = product_;

			const product = await Product.findOne({
				where: {
					id: productId,
				},
			});

			const productOrder = await ProductOrder.create({
				quantity: quantity,
				orderId: order.id,
				productId: product.id,
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	const result = await Order.findOne({
		where: { id: order.id },
		include: Product,
	});

	return res.status(201).json({ result });
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
