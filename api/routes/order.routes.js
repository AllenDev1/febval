//Order Routes
const express = require("express");
const router = express.Router();
const { Order, User, Product, ProductOrder } = require("../models/index");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

router.post("/check", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	console.log("hello")
	try {
		const { productId, quantity } = req.body;

		const product = await Product.findOne({
			id: productId,
		});

		if (!product) throw "Product doesn't exist";
		console.log("HELLO WORLD");
		console.log("user: ", user.id);
		const order = await Order.create({
			orderComplete: false,
			deliveryType: "cod",
			userId: user.id,
		});

		const productOrder = await ProductOrder.create({
			quantity: quantity,
			orderId: order.id,
			productId: product.id,
		});

		const result = await Order.findOne({
			id: order.id,
		});

		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
