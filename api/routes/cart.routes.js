//cart Routes
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const { Op } = require("sequelize");
const { ensureLoggedIn } = require("../middlewares/Auth.js");

// create cart

router.post("/create", ensureLoggedIn, async (req, res) => {
    console.log(req.user);
    // const user = req.user;
    // try {
    //     const { productId, quantity } = req.body;
    //     const cart = await Cart.create({
    //         userId: user.id,
    //         productId: productId,
    //         quantity: quantity,
    //     });
    //     res.status(201).json({ cart });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});

//Update cart
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, productId, quantity } = req.body;
        const [updated] = await Cart.update(
            {
                userId: userId,
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

//Delete cart
router.delete("/delete/:id", async (req, res) => {
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

//Get user cart
router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findAll({
            where: { userId: id },
            include: [
                {
                    model: Product,
                    as: "product",
                },
            ],
        });
        if (cart) {
            return res.status(200).json({ cart });
        }
        return res
            .status(404)
            .send("Cart with the specified ID does not exists");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get all carts
router.get("/", async (req, res) => {
    try {
        const carts = await Cart.findAll({
            include: [
                {
                    model: Product,
                    as: "product",
                },
            ],
        });
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
