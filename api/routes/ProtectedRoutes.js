//Protucted Routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const { Op } = require('sequelize');
// const { isAuth } = require("../middlewares/auth");

// create product
router.post('/create', isAuth, async (req, res) => {
    try {
        const { name, description, category, discount, price, image, quantity, active } = req.body;
        const product = await Product.create({
            name: name,
            description: description,
            category: category,
            discount: discount,
            price: price,
            image: image,
            quantity: quantity,
            active: active
        });
        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Update product
router.put('/update/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, discount, price, image, quantity, active } = req.body;
        const [updated] = await Product.update({
            name: name,
            description: description,
            category: category,
            discount: discount,
            price: price,
            image: image,
            quantity: quantity,
            active: active
        }, {
            where: { id: id }
        });
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id: id } });
            return res.status(200).json({ product: updatedProduct });
        }
        throw new Error('Product not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete product
router.delete('/delete/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Product deleted");
        }
        throw new Error("Product not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;

