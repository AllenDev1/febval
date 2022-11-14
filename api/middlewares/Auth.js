// isAdmin middleware
const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).send("You are not an admin");
};

const ensureLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).send("You are not logged in");
};

module.exports = {
    ensureAdmin,
    ensureLoggedIn,
};