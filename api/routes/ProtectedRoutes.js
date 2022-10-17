const express = require("express");
const router = express.Router();
const AdminRoutes = require("./AdminRoutes");
const { requiredScopes } = require("express-oauth2-jwt-bearer");

router.use("/admin", requiredScopes("full:admin"), AdminRoutes);

router.get("/", (req, res) => {
    res.send("You have reached the api-endpoint");
});

router.get("/some-route", (req, res) => {
    res.send("You are at /api/some-route");
});

module.exports = router;
