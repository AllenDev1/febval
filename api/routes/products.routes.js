//produt route
const express = require("express");
const { ensureAdmin } = require("../middlewares/Auth.js");
const router = express.Router();
const { Product, ProductImages, Cart } = require("../models");

// create product
router.post("/create", ensureAdmin, async (req, res) => {
	try {
		const {
			name,
			description,
			category,
			discount,
			price,
			images,
			quantity,
			active,
		} = req.body;

		// images = ["url1", "url2"]
		// productImages = [{image: "url1"}, {image: "url2"}]
		const productImages = images.map((item) => {
			return { image: item };
		});

		const product = await Product.create(
			{
				name: name,
				description: description,
				category: category,
				discount: discount,
				price: price,
				productImages: productImages,
				quantity: quantity,
				active: active,
			},
			{
				include: [Product.ProductImages],
			}
		);

		res.status(201).json({ product });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Update product
router.put("/update/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const {
			name,
			description,
			category,
			discount,
			price,
			images,
			quantity,
			active,
		} = req.body;

		const productImages = images.map((item) => {
			return { image: item };
		});
		const [updated] = await Product.update(
			{
				name: name,
				description: description,
				category: category,
				discount: discount,
				price: price,
				productImages: productImages,
				quantity: quantity,
				active: active,
			},
			{
				where: { id: id },
				include: { model: ProductImages, as: "productImages" },
			}
		);
		if (updated) {
			const updatedProduct = await Product.findOne({ where: { id: id } });
			return res.status(200).json({ product: updatedProduct });
		}
		throw new Error("Product not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Delete product
router.delete("/delete/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Product.destroy({
			where: { id: id },
		});
		if (deleted) {
			return res.status(204).send("Product deleted");
		}
		throw new Error("Product not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get all products
router.get("/", async (req, res) => {
	const { cat } = req.query;
	try {
		let products;
		if (cat) {
			products = await Product.findAll({
				include: { model: ProductImages, as: "productImages" },
				where: { category: cat },
			});
		} else {
			products = await Product.findAll({
				include: { model: ProductImages, as: "productImages" },
				
			});
		}

		res.status(200).json({ products });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get product by id
router.get("/get/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findOne({
			where: { id: id },
			include: { model: ProductImages, as: "productImages" },
		});
		if (product) {
			return res.status(200).json({ product });
		}
		return res
			.status(404)
			.send("Product with the specified ID does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get product by category
router.get("/category/:category", async (req, res) => {
	try {
		const { category } = req.params;
		const products = await Product.findAll({
			where: { category: category },
		});
		if (products) {
			return res.status(200).json({ products });
		}
		return res
			.status(404)
			.send("Product with the specified category does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get product by name
router.get("/name/:name", async (req, res) => {
	try {
		const { name } = req.params;
		const products = await Product.findAll({
			where: { name: name },
		});
		if (products) {
			return res.status(200).json({ products });
		}
		return res
			.status(404)
			.send("Product with the specified name does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get product by price
router.get("/price/:price", async (req, res) => {
	try {
		const { price } = req.params;
		const products = await Product.findAll({
			where: { price: price },
		});
		if (products) {
			return res.status(200).json({ products });
		}

		return res
			.status(404)
			.send("Product with the specified price does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//get product price assending
router.get("/price/assending", async (req, res) => {
	try {
		const products = await Product.findAll({
			order: [["price", "ASC"]],
		});
		if (products) {
			return res.status(200).json({ products });
		}
		return res
			.status(404)
			.send("Product with the specified price does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//get product price descending
router.get("/price/descending", async (req, res) => {
	try {
		const products = await Product.findAll({
			order: [["price", "DESC"]],
		});
		if (products) {
			return res.status(200).json({ products });
		}
		return res
			.status(404)
			.send("Product with the specified price does not exists");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;

module.exports = router;
