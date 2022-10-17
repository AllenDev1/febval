const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Admin index route");
});

module.exports = router;
