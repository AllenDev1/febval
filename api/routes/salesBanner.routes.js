const express = require("express");
const { ensureAdmin } = require("../middlewares/Auth");
const { SalesBanner } = require("../models/index");
const router = express.Router();

//create sales banner
router.post("/create", ensureAdmin, async (req, res) => {
	try {
		const { image, active, name } = req.body;
		const salesBanner = await SalesBanner.create({
			image: image,
			active: active,
			name: name,
		});
		res.status(201).json({ salesBanner });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Update sales banner
router.put("/update/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const { image, active } = req.body;
		const [updated] = await SalesBanner.update(
			{
				image: image,
				active: active,
			},
			{
				where: { id: id },
			}
		);
		if (updated) {
			const updatedSalesBanner = await SalesBanner.findOne({
				where: { id: id },
			});
			return res.status(200).json({ salesBanner: updatedSalesBanner });
		}
		throw new Error("Sales Banner not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//Delete sales banner
router.delete("/delete/:id", ensureAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await SalesBanner.destroy({
			where: { id: id },
		});
		if (deleted) {
			return res.status(204).send("Sales Banner deleted");
		}
		throw new Error("Sales Banner not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// get sales banner

router.get("/", async (req, res) => {
	try {
		const image = await SalesBanner.findAll();
		res.status(200).json({ image });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
