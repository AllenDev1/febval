const router = require("express").Router();
const passort = require("passport");

router.get("/google", passort.authenticate("google", { scope: ["profile"] }));

router.get("/login/failure", (req, res) => {
	res.send("Failed to login");
});

router.get("/login/success", (req, res) => {
    if(req.user){
        res.send({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
});

router.get(
	"/google/callback",
	passort.authenticate("google",{
        successRedirect: "http://localhost:3000/",
        failureRedirect: "/login/failure"
    }
));

module.exports = router;