//Order Routes
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

// create order
router.post("/create", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const { productId, quantity } = req.body;
		const cart = await Cart.create({
			userId: user.id,
			productId: productId,
			quantity: quantity,
		});
		res.status(201).json({ cart });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Update order
router.put("/update/:id", ensureLoggedIn, async (req, res) => {
	const user = req.user;
	try {
		const { id } = req.params;
		const { productId, quantity } = req.body;
		const [updated] = await Cart.update(
			{
				userId: user.id,
				productId: productId,
				quantity: quantity,
			},
			{
				where: { id: id },
			}
		);
		if (updated) {
			const updatedCart = await Cart.findOne({ where: { id: id } });
			return res.status(200).json({ cart: updatedCart });
		}
		throw new Error("Cart not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Delete order
router.delete("/delete/:id", ensureLoggedIn, async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Cart.destroy({
			where: { id: id },
		});
		if (deleted) {
			return res.status(204).send("Cart deleted");
		}
		throw new Error("Cart not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get all orders
router.get("/all", ensureLoggedIn, async (req, res) => {
	try {
		const carts = await Cart.findAll();
		res.status(200).json({ carts });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get order by id
router.get("/:id", ensureLoggedIn, async (req, res) => {
	try {
		const { id } = req.params;
		const cart = await Cart.findOne({
			where: { id: id },
		});
		if (cart) {
			res.status(200).json({ cart });
			return;
		}
		res.status(404).send("Cart with the specified ID does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
