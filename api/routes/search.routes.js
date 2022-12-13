const express = require("express");
const router = express.Router();
const {Order, User, Product, Cart} = require("../models/index");
const {Op} = require("sequelize");

router.get("/products/:words", async (req, res) => {
	try {
		const { words } = req.params;
		const products = await Product.findAll({
			where: {
				[Op.or]: [
					{ name: { [Op.like]: `%${words}%` } },
					{ description: { [Op.like]: `%${words}%` } },
                    {category: {[Op.like]: `%${words}%`}}
				],
			},
		});
		if (products) {
			return res.status(200).json({ products });
		}
		return res
			.status(404)
			.send("Product with the specified words does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;