//Order Routes
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const { ensureLoggedIn } = require("../middlewares/Auth.js");


//checkout
router.post("/checkout", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const cart = await Cart.findAll({
			where: { userId: user.id },
			include: Product,
		});
		const total = cart.reduce((acc, item) => {
			return acc + item.quantity * item.product.price;
		}, 0);
		res.status(200).json({ total });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});


module.exports = router;
