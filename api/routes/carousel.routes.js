const express = require("express");
const { ensureAdmin } = require("../middlewares/Auth");
const router = express.Router();
const { SalesCarousel } = require("../models");
const { Op } = require("sequelize");

//  create carousel
router.post("/create", ensureAdmin, async (req, res) => {
	try {
		const { image, active } = req.body;
		const carousel = await SalesCarousel.create({
			image: image,
			active: active,
		});
		res.status(201).json({ carousel });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Update carousel
router.put("/update/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const { image, active } = req.body;
		const [updated] = await SalesCarousel.update(
			{
				image: image,
				active: active,
			},
			{
				where: { id: id },
			}
		);
		if (updated) {
			const updatedCarousel = await SalesCarousel.findOne({
				where: { id: id },
			});
			return res.status(200).json({ carousel: updatedCarousel });
		}
		throw new Error("Carousel not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Delete carousel
router.delete("/delete/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await SalesCarousel.destroy({
			where: { id: id },
		});
		if (deleted) {
			return res.status(204).send("Carousel deleted");
		}
		throw new Error("Carousel not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Get all carousels
router.get("/all", async (req, res) => {
	try {
		const carousels = await SalesCarousel.findAll();
		res.status(200).json({ carousels });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
