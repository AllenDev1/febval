// ggoogle pay routes

const router = require("express").Router();
const { ensureLoggedIn } = require("../middlewares/Auth.js");

//google pay 
router.post("/payment", (req, res) => {
    res.status(200).json({ success: "payment success" });
}
);

