const router = require("express").Router();
const passort = require("passport");
const {ensureLoggedIn} = require("../middlewares/Auth");
const { User } = require("../models/index.js");


// get user info
router.get("/info", ensureLoggedIn, async (req, res) => {
	let user = req.user;
	try {
		const userInfo = await User.findOne({
			where: { id: user.id },
		});
		return res.sendStatus(200).json(userInfo);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500).json({ error: error.message });
	}
});



router.post("/info", ensureLoggedIn, async (req, res) => {
	let user = req.user;
	try {
		const { phone, address } = req.body;
		const updated = await User.update(
			{
				phone: phone,
				address: address,
			},
			{
				where: { id: user.id },
			}
		);
		if (updated) {
			const updatedUser = await User.findOne({ where: { id: user.id } });
			return res.status(200).json({ user: updatedUser });
		}
		throw new Error("User not found");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
