const router = require("express").Router();
const passort = require("passport");

router.get(
    "/google",
    passort.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/failure", (req, res) => {
    return res.send("Failed to login");
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        return res.send({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies,
        });
    } else {
        return res.sendStatus(401).send("User not authenticated");
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    return res.redirect(process.env.URL);
});

router.get(
    "/google/callback",
    passort.authenticate("google", {
        successRedirect: `https://febval-upem.onrender.com`,
        failureRedirect: "/login/failure",
    })
);

module.exports = router;
