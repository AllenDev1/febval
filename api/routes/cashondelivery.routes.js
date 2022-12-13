const route = require("express").Router();

const { ensureAdmin } = require("../middlewares/Auth.js");
const { Product, ProductImages, Cart } = require("../models");

// cash on delivery
route.post("/cash", ensureAdmin, async (req, res) => {
    try {
        const { name, description, category, discount, price, images, quantity, active } = req.body;
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
