const route = require("express").Router();

const { ensureAdmin } = require("../middlewares/Auth.js");
const { Product, ProductImages, ProductSize } = require("../models");

// cash on delivery
route.post("/cash", ensureAdmin, async (req, res) => {
    try {
        const { name, description, category, discount, price, images, quantity, active, size } = req.body;
        const productImages = images.map((item) => {
            return { image: item };
        });
        const productSize = size.map((item) => {
            return { size: item };
        });
        const product = await Product.create(
            {
                name: name,
                description: description,
                category: category,
                discount: discount,
                price: price,
                productImages: productImages,
                productSize: productSize,
                quantity: quantity,
                active: active,
            },
            {
                include: [Product.ProductImages, Product.ProductSize],
            }
        );
        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
