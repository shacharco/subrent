function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
         return next();
    }
    res.sendStatus(404);
    // res.redirect("/find");
}

module.exports = {
    checkAuthenticated
}