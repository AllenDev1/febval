// isAdmin middleware
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).send("You are not an admin");
}

module.exports = isAdmin;
