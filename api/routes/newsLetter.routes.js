const express = require("express");
const router = express.Router();
const NewsLetter = require("../models/newsLetter.model.js");

// create newsLetter

router.post("/create", async (req, res) => {
	try {
		const { email } = req.body;
		const newsLetter = await NewsLetter.create({
			email: email,
		});
		res.status(201).json({ newsLetter });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
